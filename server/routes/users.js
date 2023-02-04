const bcrypt = require('bcrypt');
const excuteQuery = require('../db/db');
const uuid = require('uuid');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
// const SendmailTransport = require('nodemailer/lib/sendmail-transport');

dotenv.config({ path: '.env-local' });

const signup = async (request, reply) => {
   const { userMail, userPassword } = request.body;
   try {
      const validationBody = checkSignupBody(userMail, userPassword);
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
      err.code === 'ER_DUP_ENTRY' ? reply.status(409).send({
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
      const resetPasswordCode = null;
      await excuteQuery(
         `UPDATE users SET user_reset_password_code=? WHERE user_id=?`,
         [resetPasswordCode, candidateUser.user_id]);
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

const forgetPassword = async (request, reply) => {
   try {
      const userMail = request.body.mail;
      const candidateUser = await checkUserExist(userMail);
      if (candidateUser === undefined) {
         reply.status(404).send({
            'err': `There is no user ${userMail}`
         });
      };
      const resetPasswordCode = uuid.v1();
      const sendMailStatus = await sendResetPassCodeMail(userMail, resetPasswordCode);
      if (sendMailStatus !== undefined) {
         reply.status(400).send(sendMailStatus)
      };
      await excuteQuery(
         `UPDATE users SET user_reset_password_code=? WHERE user_id=?`,
         [resetPasswordCode, candidateUser.user_id]);

      reply.status(202).send({
         message: `Reset password code was sent to ${userMail} successfully`,
         mail: userMail,
         url: ``
      });
   }
   catch {
      reply.status(400).send(err);
   }
}

const resetPassword = async (request, reply) => {
   try {
      let { resetPasswordCode, userEmail, newPassword } = request.body;
      const validationBody = checkResetPassBody(resetPasswordCode, newPassword);
      if (validationBody.status === 400) {
         reply.status(400).send(validationBody.err);
      }
      const resPassCodeUser = await varifyResetPassCode(userEmail, resetPasswordCode);
      if (resPassCodeUser.status === 400) {
         reply.status(400).send(resPassCodeUser.err);
      }
      resetPasswordCode = null;
      await excuteQuery(
         `UPDATE users SET user_password=?, user_reset_password_code=? WHERE user_id=?`,
         [await hashPassword(newPassword), resetPasswordCode, resPassCodeUser.userId]);
      reply.status(202).send({ message: `The password for user ${userEmail} was changed` });
   }
   catch (err) {
      reply.status(500).send(err);
   }
}

async function hashPassword(password) {
   return await bcrypt.hash(password, 10);
}

function checkSignupBody(userMail, userPassword) {
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

function checkResetPassBody(resetPasswordCode, newPassword) {
   if (!resetPasswordCode || !newPassword) {
      return {
         status: 400,
         err: 'Please, provide both: reset password code and new password'
      }
   }
   return { status: 200 }
}

async function varifyResetPassCode(userEmail, resetPasswordCode) {
   const userData = await excuteQuery('SELECT * FROM users WHERE user_mail = ?', [userEmail]);
   console.log('USER EMAIL', userEmail);
   console.log('REQUEST', resetPasswordCode);
   console.log('DATABASE', userData[0].user_reset_password_code);
   if (userData[0].user_reset_password_code !== resetPasswordCode) {
      return {
         status: 400,
         err: 'Wrong reset password code or password was not reset'
      }
   }
   return {
      status: 200,
      userId: userData[0].user_id
   }
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

async function sendResetPassCodeMail(mail, resetPasswordCode) {
   try {
      const transporter = nodemailer.createTransport({
         host: process.env.EMAIL_HOST,
         port: 587,
         secure: false,
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
         }
      });
      const options = {
         from: process.env.EMAIL_USER,
         to: mail,
         subject: "Refund tracker reset password",
         text: "Hello world?",
         html: `<h2>Hello</h2>
      <br>
      <p>You recently requested to reset your password for your Refund Tracker account.</p>
      <p>Use the code below to reset it.</p>
      <h4>Reset password code: ${resetPasswordCode}</h4>`
      }
      await transporter.sendMail(options);
   }
   catch (err) {
      return err;
   }
}

module.exports = {
   signup,
   login,
   varifyAccessToken,
   forgetPassword,
   resetPassword
};