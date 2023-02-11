const refundsSchemas = require('../controllers/schemas/refundsSchemas');
const refundsHandlers = require('../controllers/handlers/refundsHandlers');


async function routes(fastify, option) {
   fastify.get('/refoundsList', {
      schema: refundsSchemas.getRefundsListSchema,
      handler: refundsHandlers.getRefundsListHandler
   })

}

module.exports = routes;