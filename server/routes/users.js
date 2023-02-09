const bcrypt = require('bcrypt');
const excuteQuery = require('../db/db');
const uuid = require('uuid');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '.env-local' });

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
   try {
      const userMail = request.body.mail;
      const userPassword = request.body.userPassword;
      const candidateUser = await checkUserExist(userMail);
      if (candidateUser === undefined) {
         reply.status(404).send({
            'err': `There is no user ${userMail}`
         });
      };
      if (!await checkUserPassword(userPassword, candidateUser.user_password)) {
         reply.status(401).send({
            'err': `Password is not correct for user ${userMail}`
         });
      }
      const accessToken = await tokenGenerator({
         userId: candidateUser.user_id,
         userMail: candidateUser.user_mail
      });
      reply.status(202).send({ accessToken: `Bearer ${accessToken}` });
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

async function tokenGenerator(payload) {
   const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: process.env.JWT_ACCESS_EXPIRE });
   return accessToken;
}

async function varifyAccessToken(request, reply) {
   if (!request.headers['authorization']) {
      reply.status(401).send({ err: 'It is not authorizated request' })
      return false;
   }
   try {
      const headerToken = request.headers['authorization'].split(' ');
      const verify = jwt.verify(headerToken[1], process.env.JWT_ACCESS_SECRET_KEY);
      return verify;
   }
   catch (err) {
      reply.status(401).send(err);
   }
}


module.exports = {
   signup,
   login,
   varifyAccessToken
};
