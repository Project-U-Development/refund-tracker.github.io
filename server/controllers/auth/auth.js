const secret = 'refunds_tracker_jwt_secret'

const verifyToken = (request, reply, done) => {
    const { token } = request.headers;
  
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            done(new Error('Unauthorized'));
        }
  
        request.user = {
            id: decoded.id, 
        };
    })
};

module.exports = { verifyToken }