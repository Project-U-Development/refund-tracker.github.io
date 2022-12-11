const fastify = require('fastify')({ logger: true });

fastify.register(require('./routes/routeMain'));
fastify.register(require('./routes/routeVersion'))

const server = async () => {
   try {
      const port = 80;
      await fastify.listen({ port: port });
      console.info(`Server FASTIFY is working on port ${port}...`);
   }
   catch (err) {
      fastify.log.error(err);
      process.exit(1);
   }
};

server();