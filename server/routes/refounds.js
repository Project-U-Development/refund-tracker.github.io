const excuteQuery = require('../db/db');
const users = require('./users');

const getRefoundList = async (request, reply) => {
   const payload = await users.varifyAccessToken(request, reply);
   const userId = payload.userId;
   try {
      let data = await excuteQuery('SELECT * FROM `refunds` WHERE user_id=?', [userId]);
      let result = [];
      if (data.length > 0) {
         for (let i = 0; i < data.length; i++) {
            result[i] = {
               'idRefound': data[i].refund_id,
               'creationTime': data[i].creation_time,
               'productName': data[i].product_name,
               'debtor': data[i].debtor,
               'amount$': data[i].amount$,
               'currency': data[i].currency,
               'dueDate': data[i].due_date,
               'ifCompleted': data[i].if_completed
            }
         }
      }
      else { result = { message: 'There is no any records!' } }
      reply.status(200).send(result);
   }
   catch (err) {
      reply.status(500).send(err);
   }
}

module.exports = {
   getRefoundList
};