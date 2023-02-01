// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const executeQuery = require('../../db/db');
// const secret = require('../auth/auth')

// const loginUserHandler = async(request, reply) => {
//     const userMail = request.body.user_mail;
//     const userPassword = request.body.user_password;

//     try {
//         const user = await executeQuery('select * from users where user_mail=?', [userMail]);
//         if (!user[0]) {
//             return reply.send("User doesn't exist");
//         }

//         // check if password is correct
//         let isPasswordValid = await bcrypt.compare(userPassword, user[0].user_password);
//         if (!isPasswordValid) {
//             return reply.send('Invalid credentials');
//         }

//         // sign a token
//         jwt.sign(
//             { id: user[0].id, userMail: user[0].user_mail },
//             secret,
//             { expiresIn: 3 * 86400 },
//             (err, token) => {
//                 if (err) reply.status(500).send(new Error(err));
//                 reply.send({ token });
//             }
//         );
//         await reply;
//     } catch (err) {
//         reply.status(500).send(err);
//     }
// };


// module.exports = { loginUserHandler };
