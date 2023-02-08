const {
  createRefundSchema
} = require('../controllers/schemas/refunds.js');

const {
  createRefundHandler
} = require('../controllers/handlers/refunds.js');

const createRefundOpts = {
  schema: createRefundSchema,
  handler: createRefundHandler,
};

const refundRoutes =  async (fastify, options, done) => {
    fastify.post('/refund', async (request, reply) => {
      reply.send('Hello  world')
    });
  };

  module.exports =  refundRoutes;