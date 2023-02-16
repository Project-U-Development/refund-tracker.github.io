const executeQuery = require('../../db/db');
const dotenv = require('dotenv');
const { verifyToken } = require('../authorization/verifyToken');

if (process.env.NODE_ENV === 'local') {
   dotenv.config({ path: './.env-local' });
}
else {
   dotenv.config({ path: './.env' });
}

const getRefundsListHandler = async (request, reply) => {
   try {
      const token = request.headers['authorization'].split(' ')[1];
      const payload = await verifyToken(token, process.env.JWT_ACCESS_SECRET_KEY);
      if (payload.status === 401) {
         return reply.status(401).send({ message: payload.message, error: payload.data })
      }
      const userId = payload.data.userId;

      let data = await executeQuery('SELECT * FROM `refunds` WHERE user_id=?', [userId]);
      if (data.length > 0) {
         return reply.status(200).send(data);
      }
      else {
         console.log(`There is no any records!`)
         return reply.status(202).send(`There is no records!`);
      }
   }
   catch (err) {
      return reply.status(500).send(err);
   }
}

module.exports = {
   getRefundsListHandler
}