const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const dotenv = require('dotenv');
const executeQuery = require('../../db/db');
const nodemailer = require('nodemailer');
const { resPassEmailMessage } = require('./resPassEmailMessages');
const { verifyToken } = require('../authorization/verifyToken');

if (process.env.NODE_ENV === 'local') {
   dotenv.config({ path: './.env-local' });
}
else {
   dotenv.config({ path: './.env-prod' });
}

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
         return reply.status(404).send(candidateUser.message);
      };
      const resetPasswordCode = uuid.v1();
      const payload = {
         userMail: userMail,
         resetPasswordCode: resetPasswordCode
      }
      const resetPasswordToken = await tokenGenerator(payload, process.env.JWT_RESETPASS_SEKRET_KEY, process.env.JWT_RESETPASS_EXPIRE);
      const sendMailStatus = await sendResetPassCodeMail(userMail, resetPasswordToken);
      if (sendMailStatus.status === 200) {
         await executeQuery(
            `UPDATE users SET user_reset_password_code=? WHERE user_id=?`,
            [resetPasswordCode, candidateUser.data.user_id]);
         return reply.status(202).send(`Reset password code was sent to ${userMail} successfully`);
      }
   }
   catch (err) {
      return reply.status(400).send(err);
   }
}

const resetPasswordHandler = async (request, reply) => {
   try {
      // const token = request.headers['authorization'].split(' ')[1];
      const token = request.headers['authorization'];
      const payload = await verifyToken(token, process.env.JWT_RESETPASS_SEKRET_KEY);
      if (payload.status === 401) {
         return reply.status(401).send({ message: payload.message, error: payload.data })
      }
      const newPassword = request.body.newPassword;
      const resPassCodeUser = await varifyResetPassCode(payload.data.userMail, payload.data.resetPasswordCode);
      if (resPassCodeUser.status === 400) {
         return reply.status(400).send(resPassCodeUser.message);
      }

      await executeQuery(
         `UPDATE users SET user_password=?, user_reset_password_code=? WHERE user_id=?`,
         [await hashPassword(newPassword), null, resPassCodeUser.userId]);
      return reply.status(202).send(`The password for user ${payload.data.userMail} was changed`);
   }
   catch (err) {
      return reply.status(500).send(err);
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

function checkEmail(userMail) {
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

async function sendResetPassCodeMail(userMail, resetPasswordToken) {
   return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
         host: process.env.EMAIL_HOST,
         port: 587,
         secure: false,
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
         }
      });
      const emailMessage = resPassEmailMessage(`${process.env.LINK_RESETPASS_MAIL}#${resetPasswordToken}`);
      const options = {
         from: process.env.EMAIL_USER,
         to: userMail,
         subject: "Refund tracker reset password",
         text: emailMessage.text,
         html: emailMessage.html
      }
      transporter.sendMail(options, (error, info) => {
         if (error) {
            return reject(error);
         }
         return resolve({
            status: 200,
            message: `Reset password mail was sent to user ${userMail}`
         })
      });
   })
}

async function varifyResetPassCode(userMail, resetPasswordCode) {
   const userData = await executeQuery('SELECT * FROM users WHERE user_mail = ?', [userMail]);
   if (userData[0].user_reset_password_code !== resetPasswordCode) {
      return {
         status: 400,
         message: 'Wrong reset password code or password was not reset'
      }
   }
   return {
      status: 200,
      userId: userData[0].user_id
   }
}

module.exports = {
   getAllUsersHandler,
   getUserById,
   addUserHandler,
   loginUserHandler,
   forgetPasswordHandler,
   resetPasswordHandler
}