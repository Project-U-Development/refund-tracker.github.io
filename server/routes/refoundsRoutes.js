const refounds = require('./refounds');

async function routes(fastify, option) {
   fastify.get('/refoundsList', refounds.getRefoundList);
}

module.exports = routes;