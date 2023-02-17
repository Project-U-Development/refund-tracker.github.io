const jwt = require('jsonwebtoken');

const verifyJWT = async (request, reply, done) => {
    const { authorization } = request.headers;
    
    let token = authorization.split(' ');

    jwt.verify(token[1], process.env.JWT_ACCESS_SECRET_KEY, (err, decoded) => {
      
        if (err) {
            done(new Error('Unauthorized'));
        }
        request.user = {
            id: decoded.userId, 
        };
    });
    done();
};

module.exports = { verifyJWT }