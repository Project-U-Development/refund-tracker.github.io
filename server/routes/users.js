const bcrypt = require('bcrypt');
const excuteQuery = require('../db/db');
const uuid = require('uuid');
const validator = require('validator');

const signup = async (request, reply) => {
   const { user_mail, user_password } = request.body;
   try {
      const validationBody = checkBody(user_mail, user_password);
      if (validationBody.status === 400) {
         reply.status(400).send(validationBody.err);
      }
      await excuteQuery(
         'INSERT INTO users(user_id, user_mail, user_password) VALUES (?,?,?)',
         [uuid.v4(), user_mail, await hashPassword(user_password)]);
      reply.status(200).send({
         message: `User ${user_mail} is registered`,
         mail: user_mail
      });
   }
   catch (err) {
      reply.status(400).send(err);
   }
}

async function hashPassword(password) {
   return await bcrypt.hash(password, 10);
}

function checkBody(user_mail, user_password) {
   if (!user_mail || !user_password) {
      return {
         status: 400,
         err: 'Please, provide both email and password'
      }
   }
   if (!validator.isEmail(user_mail)) {
      return {
         status: 400,
         err: 'Please, provide a valid email address'
      }
   }
   return { status: 200 }
}

module.exports = { signup };