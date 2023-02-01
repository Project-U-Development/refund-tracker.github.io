const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: './.env-local' });

const dataBase = mysql.createPool({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
   port: process.env.DATABASE_PORT,
})

dataBase.getConnection((error) => {
   error ? console.log(error) : console.log('MySQL is connected!')
})

process.on('SIGTERM', async () => {
   await closeConnection();
})

async function closeConnection() {
   await dataBase.drain();
   dataBase.end();
   console.log('DataBase closed...');
   process.exit(0);
}

const executeQuery = (query, arrayParam) => {
   return new Promise((resolve, reject) => {
      try {
         dataBase.query(
            query,
            arrayParam,
            (err, results, fields) => { err ? reject(err) : resolve(results) });
      }
      catch (err) {
         reject(err);
      }
   })
}

// const getUserByEmail = async (email) => {
//    const user = await executeQuery('select * from users where user_mail=?', [email]);
// }

module.exports = {
   executeQuery
  // ,getUserByEmail
};