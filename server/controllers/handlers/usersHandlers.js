const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const dotenv = require('dotenv');
const executeQuery = require('../../db/db');

dotenv.config({ path: '.env-local' });

const addUserHandler = async (request, reply) => {
   const { userMail, userPassword } = request.body;
   try {
      const validationEmail = checkEmail(userMail, userPassword);
      if (validationEmail.status === 400) {
         return reply.status(400).send(validationEmail.message);
      }
      await executeQuery(
         'INSERT INTO users(user_id, user_mail, user_password) VALUES (?,?,?)',
         [uuid.v4(), userMail, await hashPassword(userPassword)]);
      return reply.status(201).send(`User ${userMail} is registered`);
   }
   catch (err) {
      return err.code === 'ER_DUP_ENTRY' ? reply.status(403).send(`An Email |${userMail}| is already in use. Please, provide email not registered before`) :
         reply.status(400).send(err);
   }
}

const loginUserHandler = async (request, reply) => {
   const { userMail, userPassword } = request.body;
   try {
      const candidateUser = await checkUserExist(userMail);
      if (candidateUser.status === 404) {
         return reply.status(404).send(candidateUser.message);
      };
      if (!await checkUserPassword(userPassword, candidateUser.data.user_password)) {
         return reply.status(401).send(`Password is not correct for user ${userMail}`);
      }
      const payload = {
         userId: candidateUser.data.user_id,
         userMail: candidateUser.data.user_mail
      };
      const secretKey = process.env.JWT_ACCESS_SECRET_KEY;
      const tokenExpiresIn = process.env.JWT_ACCESS_EXPIRE;
      const accessToken = await tokenGenerator(payload, secretKey, tokenExpiresIn);
      return reply.status(202).send({ accessToken: `Bearer ${accessToken}` });
   }
   catch (err) {
      return reply.status(500).send(err);
   }
}

const forgetPasswordHandler = async (request, reply) => {
   try {
      const userMail = request.body.userMail;
      const candidateUser = await checkUserExist(userMail);
      if (candidateUser.status === 404) {
         reply.status(404).send(candidateUser.message);
      };
      const resetPasswordCode = uuid.v1();
      const payload = {
         userMail: userMail,
         resetPasswordCode: resetPasswordCode
      }
      // const resetPasswordToken = await tokenGenerator(payload, process.env.JWT_RESETPASS_SEKRET_KEY, process.env.JWT_RESETPASS_EXPIRE);
      // const sendMailStatus = await sendResetPassCodeMail(userMail, resetPasswordToken);
      // if (sendMailStatus !== undefined) {
      //    reply.status(400).send(sendMailStatus)
      // };
      // await excuteQuery(
      //    `UPDATE users SET user_reset_password_code=? WHERE user_id=?`,
      //    [resetPasswordCode, candidateUser.user_id]);

      // reply.status(202).send({
      //    message: `Reset password code was sent to ${userMail} successfully`
      // });
   }
   catch {
      reply.status(400).send(err);
   }
}


const getAllUsersHandler = async (request, reply) => {
   try {
      let userData = await executeQuery('SELECT * FROM `users`', []);
      reply.status(200).send(userData);
   }
   catch (err) {
      reply.status(500).send(err);
   }
}

const getUserById = async (request, reply) => {
   const idUser = request.params.id;
   try {
      let userData = await executeQuery('SELECT * FROM users WHERE user_id=?', [idUser]);
      reply.status(200).send(userData[0]);
   }
   catch (err) {
      reply.status(500).send(err);
   }
}

async function hashPassword(password) {
   return await bcrypt.hash(password, 10);
}

function checkEmail(userMail, userPassword) {
   if (!validator.isEmail(userMail)) {
      return {
         status: 400,
         message: 'Please, provide a valid email address'
      }
   }
   return { status: 200 }
}

async function checkUserExist(userMail) {
   const [result] = await executeQuery('SELECT * FROM users WHERE user_mail = ?', [userMail]);
   if (result === undefined) {
      return {
         status: 404,
         data: result,
         message: `There is no user ${userMail}`
      }
   }
   else {
      return {
         status: 200,
         data: result,
         message: `The user ${userMail} has been found successfully`
      }
   }
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
   loginUserHandler,
   forgetPasswordHandler
}