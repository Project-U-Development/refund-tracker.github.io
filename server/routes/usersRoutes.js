const users = require('./users');
const { loginUserSchema } = require('../controllers/schemas/users');
const { loginUserHandler } = require('../controllers/handlers/users');

const loginUserOpts = {
    schema: loginUserSchema,
    handler: loginUserHandler,
 };

async function routes(fastify, option) {
    fastify.post('/signup', users.signup);
    fastify.post('/login', loginUserOpts);
}

module.exports = routes;