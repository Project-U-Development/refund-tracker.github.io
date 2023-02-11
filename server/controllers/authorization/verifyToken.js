const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({ path: '.env-local' });

async function verifyToken(token, secretKey) {
   try {
      const verify = jwt.verify(token, secretKey);
      return {
         status: 200,
         data: verify,
         message: 'Token is verified successfully'
      };
   }
   catch (err) {
      return {
         status: 401,
         data: err,
         message: 'Token is not verified!'
      };
   }
}

module.exports = {
   verifyToken
}