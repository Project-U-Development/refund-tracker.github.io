const app = require('fastify')
const bcrypt = require('bcrypt')
const mysql = require('mysql2')

const connection = mysql.createPool({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
   port: process.env.DATABASE_PORT,
});

//closing pool?
//process.on('SIGINT', async () => {
//    await closeConnection();
//});

//async function closeConnection(){
    // // Wait for all the connections to be released
//    await pool.drain();
    // // Close the pool
//    pool.end();
//    console.log('Pool closed');
 //   process.exit(0);
//}

async function checkEmailExists(email, connection) {
   const [results] = await connection.execute(`SELECT 1 FROM users WHERE email = ?`, [email]);
   return results.length > 0 ? true : false;
}
//By using prepared statements, you can avoid SQL injection attacks
   
   async function hashPassword(password) {
   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   return hashedPassword;
   }
app.post('/signup', async (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      
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
      await connection.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
      return res.status(201).send({ message: 'User registered successfully'});
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
