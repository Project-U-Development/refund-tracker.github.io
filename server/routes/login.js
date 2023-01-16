const app = require('fastify') //server
const bcrypt = require('bcrypt') // crypt for password
const mysql = require('mysql2') // database using
const jwt = require('jsonwebtoken'); //token generator
const validator = require('validator'); //validation if the email is real
const winston = require('winston'); //logging library
const rateLimit = require("fastify-rate-limit"); //request limitation from 1 IP safety

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
      winston.info('Pool closed');
      process.exit(0);
    } catch (err) {
      winston.error(err);
    }
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

  //By using prepared statements, you can avoid SQL injection attacks
async function checkEmailExists(email, connection) {
    const [results] = await connection.execute(`SELECT 1 FROM users WHERE email = ?`, [email]);
    return results.length > 0 ? true : false;
 }


 app.post('/login', 
 { 
    preValidation: app.rateLimit({ 
      key: "ip", 
      message: "Too many login attempts from this IP, please try again later" 
    }) 
  }, 
  async (request, reply) => {
    const email = request.body.email;
    const password = request.body.password; 

// if email and password were provided
    const inputValidation = validateInput(email, password);
    if (inputValidation.status === 400) {
    return reply.status(inputValidation.status).send({ error: inputValidation.error });
       }
       
// if email already exists in database
    const exists = await checkEmailExists(email, connection);
    if (!exists) {
    return reply.status(400).send({ error: 'This email is not registered' });
    } 
// if password is correct
const user = rows[0];
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  return reply.status(400).send({ error: 'Invalid email or password' });
}

 // generate unique-token for the unique user
 const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
 // add token to cookie
 reply.setCookie('token', token, { path: '/', httpOnly: true });
 // return success message
 return reply.status(200).send({ message: 'Login successful. Welcome!' });
});

// } catch (err) {
//  console.error(err);
//  return reply.status(500).send({ error: 'An unexpected error occurred' });
// }
