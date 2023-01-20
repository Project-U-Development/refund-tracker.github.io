const fastify = require('fastify')({ logger: true });


fastify.register(require('./routes/home'));
fastify.register(require('./routes/version'));
fastify.register(require('./routes/usersRoutes'));
// fastify.register(require('./routes/usersRoutesTmp'));


const server = async () => {
   try {
      const port = 80;
      await fastify.listen({ port: port, host: '0.0.0.0' });
      console.info(`Server FASTIFY is working on port ${fastify.server.address().port}...`);
   }
   catch (err) {
      fastify.log.error(err);
      process.exit(1);
   }
};

server();