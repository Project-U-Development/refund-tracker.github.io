const mysql = require('mysql2');
const uuid = require('uuid');

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

const createRefund = async (body) => {
   let res = await executeQuery(
      `insert into refunds 
         (refund_id,creation_time,product_name,debtor,amount$,currency,
            due_date, user_id, if_completed)
      values (?,?,?,?,?,?,?,?,?)`,
      [uuid.v4(), new Date(), body.product_name, body.debtor, body.amount,
      body.currency || 'EUR', body.due_date, body.user_id, 'no']);
   return res;
}



module.exports = {
   executeQuery,
   createRefund
}