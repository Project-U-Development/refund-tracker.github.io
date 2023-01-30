const refunds = require("./refund");

async function routes(fastify, option) {
  fastify.get("/refunds", refunds.getRefunds);
}

module.exports = routes;
