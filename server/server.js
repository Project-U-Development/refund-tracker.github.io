const fastify = require('fastify')({ logger: true });
const mysql = require('mysql2');
const dotenv = require('dotenv');

fastify.register(require('./routes/home'));
fastify.register(require('./routes/version'));
fastify.register(require('./routes/signup'));

const server = async () => {
   try {
      const port = 80;
      await fastify.listen({ port: port, host: '0.0.0.0' });
      console.info(`Server FASTIFY is working on port ${fastify.server.address().port}...`);
   }
   catch (err) {
      fastify.log.error(err);
      process.exit(1);
   }
};

dotenv.config({ path: './.env' });

const dataBase = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
   port: process.env.DATABASE_PORT,
})

dataBase.connect((error) => {
   error ? console.log(error) : console.log('MySQL is connected!')
   dataBase.query(
      'SELECT * FROM `users`',
      function (err, results, fields) {
         console.log(results); // results contains rows returned by server
      }
   );
})

server();