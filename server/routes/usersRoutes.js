const users = require('./users');


async function routes(fastify, option) {
   fastify.post('/signup', users.signup);
   fastify.post('/login', users.login);
}

module.exports = routes;