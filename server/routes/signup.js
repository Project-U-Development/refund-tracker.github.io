const app = require('fastify') //server
const bcrypt = require('bcrypt') // crypt for password
const mysql = require('mysql2') // database using
const uuid = require('uuid'); // generating unique ID's for user and etc

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

async function closeConnection(){
    // Wait for all the connections to be released
    await pool.drain();
     // Close the pool
   pool.end();
   console.log('Pool closed');
    process.exit(0);
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

app.post('/signup', async (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      const newUserId = uuid.v4(); // generate a new uuid - unique user_id
      
      // if email and password were provided
      if (!email || !password) {
      return res.status(400).send({ error: 'Please provide both email and/or password' })
      }
      // if email exists
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
