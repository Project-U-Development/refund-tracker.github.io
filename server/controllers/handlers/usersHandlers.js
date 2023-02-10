const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const dotenv = require('dotenv');
const excuteQuery = require('../../db/db');

dotenv.config({ path: '.env-local' });

const addUserHandler = async (request, reply) => {
   const { userMail, userPassword } = request.body;
   try {
      const validationBody = checkBody(userMail, userPassword);
      if (validationBody.status === 400) {
         reply.status(400).send(validationBody.err);
      }
      await excuteQuery(
         'INSERT INTO users(user_id, user_mail, user_password) VALUES (?,?,?)',
         [uuid.v4(), userMail, await hashPassword(userPassword)]);
      reply.status(201).send(`User ${userMail} is registered`);
   }
   catch (err) {
      err.code === 'ER_DUP_ENTRY' ? reply.status(403).send(`An Email |${userMail}| is already in use. Please, provide email not registered before`) :
         reply.status(400).send(err);
   }
}

const loginUserHandler = async (request, reply) => {
   const { userMail, userPassword } = request.body;
   try {
      const candidateUser = await checkUserExist(userMail);
      if (candidateUser === undefined) {
         reply.status(404).send(`There is no user ${userMail}`);
      };
      if (!await checkUserPassword(userPassword, candidateUser.user_password)) {
         reply.status(401).send(`Password is not correct for user ${userMail}`);
      }
      const payload = {
         userId: candidateUser.user_id,
         userMail: candidateUser.user_mail
      };
      const secretKey = process.env.JWT_ACCESS_SECRET_KEY;
      const tokenExpiresIn = process.env.JWT_ACCESS_EXPIRE;
      const accessToken = await tokenGenerator(payload, secretKey, tokenExpiresIn);
      reply.status(202).send({ accessToken: `Bearer ${accessToken}` });
   }
   catch (err) {
      reply.status(500).send(err);
   }
}

const getAllUsersHandler = async (request, reply) => {
   try {
      let userData = await excuteQuery('SELECT * FROM `users`', []);
      reply.status(200).send(userData);
   }
   catch (err) {
      reply.status(500).send(err);
   }
}

const getUserById = async (request, reply) => {
   const idUser = request.params.id;
   try {
      let userData = await excuteQuery('SELECT * FROM users WHERE user_id=?', [idUser]);
      reply.status(200).send(userData[0]);
   }
   catch (err) {
      reply.status(500).send(err);
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
   return { status: 200 }
}

async function checkUserExist(mail) {
   const [result] = await excuteQuery('SELECT * FROM users WHERE user_mail = ?', [mail]);
   return result;
}

async function checkUserPassword(inputPassword, dbPassword) {
   return bcrypt.compareSync(inputPassword, dbPassword)
}

async function tokenGenerator(payload, secretKey, tokenExpiresIn) {
   const token = jwt.sign(payload, secretKey, { expiresIn: tokenExpiresIn });
   return token;
}

module.exports = {
   getAllUsersHandler,
   getUserById,
   addUserHandler,
   loginUserHandler
}