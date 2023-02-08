 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt');
 const {executeQuery} = require('../../db/db');
 const auth = require('../auth/auth');

const loginUserHandler = async(request, reply) => {
    const userMail = request.body.user_mail;
    const userPassword = request.body.user_password;

    try {
        const user = await executeQuery('select * from users where user_mail=?',[userMail]);
        if (!user[0]) {
            return reply.status(401).send({error:"Unauthorized",message:"User doesn't exist"});
        }

        // check if password is correct
        let isPasswordValid = await bcrypt.compare(userPassword, user[0].user_password);
        if (!isPasswordValid) {
            return reply.status(401).send({error:"Unauthorized",message:"Invalid credentials"});
        }

         jwt.sign(
            { id: user[0].id, userMail: user[0].user_mail },
            'refunds_tracker_jwt_secret',
            { expiresIn: 3 * 86400 },
            (err, accessToken) => {
                if (err) reply.status(500).send(new Error(err));
                reply.send({ accessToken });
            }
        );
        
        await reply;
        
    } catch (err) {
        reply.status(500).send(err);
    }
};


module.exports = { loginUserHandler };
