const users = require('./refunds');

const refundRoutes = (fastify, options, done) => {
    fastify.post('/refund', refunds.createRefund);
  };

  module.exports = refundRoutes;