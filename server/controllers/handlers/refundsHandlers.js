const excuteQuery = require('../../db/db');
const dotenv = require('dotenv');
const { varifyToken } = require('../authorization/verifyToken');

dotenv.config({ path: '.env-local' });

const getRefoundsListHendler = async (request, reply) => {
   const token = request.headers['authorization'].split(' ')[1];
   const payload = await varifyToken(token, process.env.JWT_ACCESS_SECRET_KEY);
   if (payload.status === 401) {
      reply.status(401).send({ message: payload.message, error: payload.data })
   }
   const userId = payload.data.userId;
   try {
      let data = await excuteQuery('SELECT * FROM `refunds` WHERE user_id=?', [userId]);
      if (data.length > 0) {
         reply.status(200).send(data);
      }
      else {
         console.log(`There is no any records!`)
         reply.status(202).send(`There is no any records!`);
      }
   }
   catch (err) {
      reply.status(500).send(err);
   }
}

module.exports = {
   getRefoundsListHendler
}