const {
  createRefundSchema
} = require('../controllers/schemas/refunds.js');

const {
  createRefundHandler
} = require('../controllers/handlers/refunds.js');
const { verifyToken } = require('../controllers/auth/auth.js');

const createRefundOpts = {
  schema: createRefundSchema,
  handler: createRefundHandler,
};

const refundRoutes =  async (fastify, options, done) => {
  
  fastify
    .register(require('@fastify/auth'))
    .after(() => privateRefundRoutes(fastify)); 

  done();
};

const privateRefundRoutes = (fastify) => {
  // create refund
  fastify.post('/refund', {createRefundOpts});
   // preHandler: fastify.auth([verifyToken]),
  //  ...

};
 
 module.exports =  refundRoutes;