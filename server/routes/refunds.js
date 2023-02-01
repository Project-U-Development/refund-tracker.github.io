// const {
//   createRefundSchema
// } = require('../controllers/schemas/refunds.js');

// const {
//   createRefundHandler
// } = require('../controllers/handlers/refunds.js');

// const createRefundOpts = {
//   schema: createRefundSchema,
//   handler: createRefundHandler,
// };

// const refundRoutes = (fastify, opyions, done) => {
//   fastify
//     .register(require('fastify-auth'))
//     .after(() => privatePostRoutes(fastify));

//     done();
//   };

//   const privateRefundRoutes = (fastify) => {
//     fastify.post('/refund', {
//       preHandler: fastify.auth([fastify.verifyToken]),
//       ...createRefundOpts});
//   };

//   module.exports = { refundRoutes , privateRefundRoutes };