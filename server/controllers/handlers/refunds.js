

// const createRefundHandler = async(request, reply) => {
//     const { userMail, userPassword,  } = request.body;
//     try {
//        await excuteQuery(
//           'INSERT INTO users(user_id, user_mail, user_password) VALUES (?,?,?)',
//           [uuid.v4(), userMail, await hashPassword(userPassword)]);
//        reply.status(201).send({
//           message: `User ${userMail} is registered`,
//           mail: userMail
//        });
//     }
//     catch (err) {
//        err.code === 'ER_DUP_ENTRY' ? reply.status(403).send({
//           message: `An Email |${userMail}| is already in use. Please, provide email not registered before`
//        }) : reply.status(400).send(err);
//     }
//   };
  
//   module.exports = { createRefundHandler };