const fastify = require('fastify')();
const mySql2 = require('mysql2');
const jwt = require('jsonwebtoken');

//creating/opening pool
const connection = mySql2.createPool({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
   port: process.env.DATABASE_PORT,
});

//closing pool in the end if the session
process.on('SIGINT', async () => {
   await closeConnection();
 });
 async function closeConnection() {
   try {
     // Wait for all the connections to be released
     await connection.drain();
     // Close the pool
     connection.end();
     console.log('Pool closed');
     process.exit(0);
   } catch (err) {
     console.error(err);
   }
 }


// Secret key for JWT verification
const secret = 'secret_key';

//  function of extracting the user's token from the cookie
const checkToken = async (request, reply, next) => {
   const token = request.cookies.token;
   try {
     // Verify the token using the secret key
     const decoded = jwt.verify(token, secret);
     // the token is valid, attach the user's ID to the request object
     request.userId = decoded.userId;
     next();
   } catch (error) {
     // the token is invalid, return an error
     reply.status(401).send({ error: 'Invalid token' });
   }
 };

 // Endpoint to delete a refund item
 fastify.delete('/refunds/:id', { preHandler: checkToken }, async (request, reply) => {
   const refundId = request.params.id;
   const userId = request.userId;
 
   // Using connection from the pool to perform the database query
   connection.getConnection((err, conn) => {
     if (err) {
       return reply.status(500).send({ error: 'Error connecting to the database' });
     }
     if (!request.query.confirm) {
      return reply.send({
        message: 'Are you sure you want to delete this refund?',
        confirmUrl: `/refunds/${refundId}?confirm=true`
      });
    }
     const query = `DELETE FROM refunds WHERE refund_id = ? AND user_id = ?`;
     conn.query(query, [refundId, userId], (error, results) => {
       if (error) {
         return reply.status(500).send({ error: 'Error deleting the refund' });
       }
       if (results.affectedRows === 0) {
         return reply.status(404).send({ error: 'Refund not found' });
       }
       reply.send({ message: 'Refund successfully deleted' });
     });
     conn.release(); // Release the connection back to the pool
   });
 });
