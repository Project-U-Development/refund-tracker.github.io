const usersSchema = require('../controllers/schemas/usersSchemas');
const usersHandler = require('../controllers/handlers/usersHandlers');


async function routes(fastify, option) {
   fastify.get('/users', {
      schema: usersSchema.getAllUsersShema,
      handler: usersHandler.getAllUsersHandler
   });
   fastify.get('/user/:id', {
      schema: usersSchema.getUserByIdShema,
      handler: usersHandler.getUserById
   });
   fastify.post('/signup', {
      schema: usersSchema.addUserSchema,
      handler: usersHandler.addUserHandler
   });
   fastify.post('/login', {
      schema: usersSchema.loginUserSchema,
      handler: usersHandler.loginUserHandler
   });
   fastify.post('/forgetpassword', {
      schema: usersShema.forgetPasswordSchema,
      handler: usersHandler.forgetPasswordHandler
   });
}

module.exports = routes;