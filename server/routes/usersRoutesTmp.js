const usersTmp = require('./usersTmp');


async function routes(fastify, option) {
   fastify.get('/users', usersTmp.getAllUsers);
   fastify.get('/user/:id', usersTmp.getUserById);
   fastify.post('/login', usersTmp.login);
   fastify.put('/updateUser/:id', usersTmp.updateUser);
   fastify.delete('/user/:id', usersTmp.deleteUserById);
}

module.exports = routes;