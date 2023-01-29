const bcrypt = require('bcrypt');
const excuteQuery = require('../db/db');
const uuid = require('uuid');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const signup = async (request, reply) => {
   const { userMail, userPassword } = request.body;
   try {
      const validationBody = checkBody(userMail, userPassword);
      if (validationBody.status === 400) {
         reply.status(400).send(validationBody.err);
      }
      await excuteQuery(
         'INSERT INTO users(user_id, user_mail, user_password) VALUES (?,?,?)',
         [uuid.v4(), userMail, await hashPassword(userPassword)]);
      reply.status(201).send({
         message: `User ${userMail} is registered`,
         mail: userMail
      });
   }
   catch (err) {
      err.code === 'ER_DUP_ENTRY' ? reply.status(403).send({
         message: `An Email |${userMail}| is already in use. Please, provide email not registered before`
      }) : reply.status(400).send(err);
   }
}

const login = async (request, reply) => {
   const { userMail, userPassword } = request.body;
   try {
      const isBodyValid = checkBody(userMail, userPassword);
      if (isBodyValid.status != 202) {
         reply.send(isBodyValid);
      }
      const dataRows = await excuteQuery(
         'Select * from users where user_mail = ?',
         [userMail]);
      if (dataRows.length==0) {
         reply.status(404).send({message:`User ${userMail} not found`})
      } else {
         let user = dataRows[0];
         let isPasswordValid = await bcrypt.compare(userPassword, user.user_password);
         if (isPasswordValid) {
            
         } else {
            reply.status(401).send({message:`Incorrect password`});
         }
      }
   }
   catch (err) {
      reply.status(400).send(err);
   }
}

async function hashPassword(password) {
   return await bcrypt.hash(password, 10);
}

function checkBody(userMail, userPassword) {
   if (!userMail || !userPassword) {
      return {
         status: 400,
         err: 'Please, provide both email and password'
      }
   }
   if (!validator.isEmail(userMail)) {
      return {
         status: 400,
         err: 'Please, provide a valid email address'
      }
   }
   return { status: 202 }
}

module.exports = { signup, login };