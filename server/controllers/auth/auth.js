const jwt = require('jsonwebtoken');

const verifyToken = (request, reply, done) => {
    const { authorization } = request.headers;
    if (authorization.slice(0,6) != 'Bearer') {
        done(new Error('Unauthorized'));
    };
  
    let token = authorization.split(' ');

    jwt.verify(token[0], 'refunds_tracker_jwt_secret', (err, decoded) => {
        reply.send(err);
        if (err) {
            done(new Error('Unauthorized'));
        }
  
        request.user = {
            id: decoded.id, 
        };
    })
};

module.exports = { verifyToken }