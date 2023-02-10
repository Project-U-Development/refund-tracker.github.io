const refundsShemas = require('../controllers/schemas/refundsShemas');
const refundsHandlers = require('../controllers/handlers/refundsHandlers');


async function routes(fastify, option) {
   fastify.get('/refoundsList', {
      schema: refundsShemas.getRefoundsListSchema,
      handler: refundsHandlers.getRefoundsListHendler
   })

}

module.exports = routes;