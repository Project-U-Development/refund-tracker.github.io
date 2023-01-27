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




module.exports = {
   getAllUsers,
   getUserById,
   updateUser,
   deleteUserById
};