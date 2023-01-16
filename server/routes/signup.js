const app = require('fastify') //server
const bcrypt = require('bcrypt') // crypt for password
const mysql = require('mysql2') // database using
const uuid = require('uuid'); // generating unique ID's for user and etc
const validator = require('validator'); //validation if the email is real
const winston = require('winston'); //logging library
const rateLimit = require("fastify-rate-limit"); //request limitation from 1 IP !safety!

app.register(rateLimit, {
   max: 3, // limit each IP to 3 requests per 10 minutes
   timeWindow: "10m"
 });

//creating/opening pool
const connection = mysql.createPool({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
   port: process.env.DATABASE_PORT,
});

//closing pool in the end if the session
process.on('SIGINT', async () => {
   await closeConnection();
 });
 async function closeConnection() {
   try {
     // Wait for all the connections to be released
     await connection.drain();
     // Close the pool
     connection.end();
     winston.info('Pool closed'); //using logging library
     process.exit(0);
   } catch (err) {
     winston.error(err);
   }
 }

//By using prepared statements, you can avoid SQL injection attacks
async function checkEmailExists(email, connection) {
   const [results] = await connection.execute(`SELECT 1 FROM users WHERE email = ?`, [email]);
   return results.length > 0 ? true : false;
}
   
   async function hashPassword(password) {
   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   return hashedPassword;
   }
   
   // if email and password were provided
   function validateInput(email, password) {
      if (!email || !password) {
        return { status: 400, error: 'Please provide both email and password' };
      }
      if (!validator.isEmail(email)) {
        return { status: 400, error: 'Please provide a valid email address' };
      }
      return { status: 200 };
    }

app.post('/signup', 
{ 
   preValidation: app.rateLimit({ 
     key: "ip", 
     message: "Too many accounts created from this IP, please try again later" 
   }) 
 },
async (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      const newUserId = uuid.v4(); // generate a new uuid - unique user_id
      
      // if email and password were provided
      const inputValidation = validateInput(email, password);
      if (inputValidation.status === 400) {
         return reply.status(inputValidation.status).send({ error: inputValidation.error });
       }
      // if email already exists in database
      const exists = await checkEmailExists(email, connection);
      if (exists) {
      return res.status(400).send({ error: 'This email is already registered' });
      } 
      else {
        try {
      const hashedPassword = await hashPassword(password);
      await connection.execute('INSERT INTO users (user_id, email, password) VALUES (?, ?, ?)', [newUserId, email, hashedPassword]);
      return res.status(201).send({ message: 'User registered successfully', id: newUserId, email: email });
      } 
      catch (err) {
      console.error(err);
      return res.status(500).send({ error: 'An error occurred while registering the user' });
      }
      }
      });

      

// async function routes(fastify, option) {
//    fastify.post('/signup', async (request, reply) => {
//       console.log(request.body);
//    })
// }

module.exports = routes;
