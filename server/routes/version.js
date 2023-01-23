async function routes(fastify, option) {
   fastify.get('/version', async (request, reply) => {
      return { version: '0.0.1' }
   })
}

module.exports = routes;