async function routes(fastify, option) {
   fastify.post('/signup', async (request, reply) => {
      console.log(request.body);
   })
}

module.exports = routes;