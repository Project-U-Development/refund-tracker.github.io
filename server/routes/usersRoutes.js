const usersSchema = require('../controllers/schemas/usersSchemas');
const usersHandler = require('../controllers/handlers/usersHandlers');

const loginUserOpts = {
    schema: loginUserSchema,
    handler: loginUserHandler,
 };

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

}

module.exports = routes;