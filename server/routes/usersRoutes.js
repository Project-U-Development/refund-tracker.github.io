const usersShema = require('../controllers/schemas/usersShemas');
const usersHandler = require('../controllers/handlers/usersHandlers');


async function routes(fastify, option) {
   fastify.get('/users', {
      schema: usersShema.getAllUsersShema,
      handler: usersHandler.getAllUsersHandler
   });
   fastify.get('/user/:id', {
      schema: usersShema.getUserByIdShema,
      handler: usersHandler.getUserById
   });
   fastify.post('/signup', {
      schema: usersShema.addUserSchema,
      handler: usersHandler.addUserHandler
   });
   fastify.post('/login', {
      schema: usersShema.loginUserSchema,
      handler: usersHandler.loginUserHandler
   });

}

module.exports = routes;