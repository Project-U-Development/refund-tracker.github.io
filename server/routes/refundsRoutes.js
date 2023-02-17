const refundsSchemas = require('../controllers/schemas/refundsSchemas');
const refundsHandlers = require('../controllers/handlers/refundsHandlers');

async function routes(fastify, option) {
   fastify.get('/refoundsList', {
      schema: refundsSchemas.getRefundsListSchema,
      handler: refundsHandlers.getRefundsListHandler
   });

   fastify
  .register(require('@fastify/auth'))
  .after(() => {
    fastify.route({
      method: 'POST',
      url: '/refund',
      schema: refundsSchemas.createRefundSchema,
      preHandler: fastify.auth([
        fastify.verifyJWT
      ]),
      handler: refundsHandlers.createRefundHandler
    })
  })

  }

module.exports = routes;