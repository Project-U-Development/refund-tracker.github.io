const users = require('./users');


async function routes(fastify, option) {
   fastify.post('/signup', users.signup);
}

module.exports = routes;