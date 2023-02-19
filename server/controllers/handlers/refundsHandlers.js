const db = require('../../db/db');
const dotenv = require('dotenv');
const { verifyToken } = require('../authorization/verifyToken');

const getRefundsListHandler = async (request, reply) => {
   try {
      const token = request.headers['authorization'].split(' ')[1];
      const payload = await verifyToken(token, process.env.JWT_ACCESS_SECRET_KEY);
      if (payload.status === 401) {
         return reply.status(401).send({ message: payload.message, error: payload.data })
      }
      const userId = payload.data.userId;

      let data = await db.executeQuery('SELECT * FROM `refunds` WHERE user_id=?', [userId]);
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

const createRefundHandler = async (request, reply) => {
   try {
      let body = request.body;
      body.user_id = request.user.id;
      await db.createRefund(body);
      reply.status(201).send(`Refund created`);      
   }
   catch (err) {
      reply.status(400).send(err);
   }
}

module.exports = {
   getRefundsListHandler,
   createRefundHandler
}