const dotenv = require("dotenv");
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

if (process.env.NODE_ENV === "local") {
   dotenv.config({ path: "./.env-local" });
} else {
   dotenv.config({ path: "./.env" });
}
fastify.register(cors, {
   origin: "*",
   methods: ["GET", "POST", "OPTIONS"],
});
const { verifyJWT } = require("./controllers/authorization/auth");
fastify.decorate("verifyJWT", verifyJWT);

fastify.register(require("./routes/home"));
fastify.register(require("./routes/version"));
fastify.register(require("./routes/usersRoutes"));
fastify.register(require("./routes/refundsRoutes"));

const server = async () => {
   try {
      const port = process.env.SERVER_PORT;
      await fastify.listen({ port: port, host: "0.0.0.0" });
      console.info(
         `Server FASTIFY is working on port ${fastify.server.address().port}...`
      );
   } catch (err) {
      fastify.log.error(err);
      process.exit(1);
   }
};

server();
