const mysql = require('mysql2');
const uuid = require('uuid');
const util = require('util');

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

const createRefund = async (body) => {
   const refundId = uuid.v4();

   const getConnection = util.promisify(dataBase.getConnection).bind(dataBase);
   const connection = await getConnection();

   const rollback = util.promisify(connection.rollback).bind(connection);
   const query = util.promisify(connection.query).bind(connection);
   const beginTransaction = util.promisify(connection.beginTransaction).bind(connection);
   const commit = util.promisify(connection.commit).bind(connection);

   await beginTransaction();

   try {
      const createRefundQuery = `insert into refunds (refund_id,creation_time,product_name,debtor,amount$,currency, due_date, user_id, if_completed) values (?,?,?,?,?,?,?,?,?);`;

      await query(createRefundQuery, [refundId, new Date(), body.product_name, body.debtor, body.amount,
         body.currency || 'EUR', body.due_date, body.user_id, 'no']);

      if (body.reminder) {
         const createReminderQuery = `insert into reminder (reminder_id,reminder_type,frequency,time_unit, refund_id) values (?,?,?,?,?);`

         await query(createReminderQuery, [uuid.v4(), body.reminder.reminder_type, body.reminder.frequency, body.reminder.time_unit, refundId]);
      }

      await commit();
   } catch (error) {
      await rollback();
      throw error;
   }
}



module.exports = {
   executeQuery,
   createRefund
}