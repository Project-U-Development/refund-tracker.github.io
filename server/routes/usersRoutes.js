const users = require('./users');


async function routes(fastify, option) {
   fastify.post('/signup', users.signup);
   fastify.post('/login', users.login);
   fastify.post('/forgetpassword', users.forgetPassword);
   // fastify.post('/resetpassword/:res', users.resetPassword);
   fastify.post('/resetpassword', users.resetPassword);
}

module.exports = routes;