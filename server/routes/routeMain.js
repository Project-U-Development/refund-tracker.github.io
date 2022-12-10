async function routes(fastify, option) {
   fastify.get('/', async (request, reply) => {
      return 'Server is working...'
   })
}

module.exports = routes;