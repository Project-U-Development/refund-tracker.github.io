const bcrypt = require('bcrypt');
const excuteQuery = require('../db/db');
const uuid = require('uuid');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const getAllUsers = async (request, reply) => {
   try {
      let userData = await excuteQuery('SELECT * FROM `users`', []);
      reply.status(200).send(userData);
   }
   catch (err) {
      reply.status(500).send(err);
   }
}

const getUserById = async (request, reply) => {
   let idUser = request.params.id;
   try {
      let userData = await excuteQuery('SELECT * FROM users WHERE user_id=?', [idUser]);
      reply.status(200).send(userData);
   }
   catch (err) {
      reply.status(500).send(err);
   }
}

dotenv.config({ path: '../.env' });
const login = async (request, reply) => {
   try {
      const userMail = request.body.mail;
      const userPassword = request.body.user_password;
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
         user_id: candidateUser.user_id,
         user_mail: candidateUser.user_mail
      });
      reply.status(202).send({ accessToken: `Bearer ${accessToken}` });
   }
   catch (err) {
      reply.status(500).send(err);
   }
}


const updateUser = async (request, reply) => {
   let idUser = request.params.id;
   const { user_mail, user_password } = request.body;
   try {
      await excuteQuery(
         `UPDATE users SET user_mail=?, user_password=? WHERE user_id=${idUser}`,
         [user_mail, await hashPassword(user_password)]);
      reply.status(200).send(`User ${user_mail} is updated`);
   }
   catch (err) {
      reply.status(400).send(err);
   }
}

const deleteUserById = async (request, reply) => {
   let idUser = request.params.id;
   try {
      let userData = await excuteQuery('DELETE FROM users WHERE user_id=?', [idUser]);
      reply.status(200).send(userData);
   }
   catch (err) {
      reply.status(500).send(err);
   }
}

async function hashPassword(password) {
   return await bcrypt.hash(password, 10);
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


module.exports = {
   getAllUsers,
   getUserById,
   login,
   updateUser,
   deleteUserById
};