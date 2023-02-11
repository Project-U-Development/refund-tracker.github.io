const stringType = { type: 'string' };

const addUserSchema = {
   body: {
      type: 'object',
      required: ['userMail', 'userPassword'],
      properties: {
         userMail: stringType,
         userPassword: stringType,
      }
   },
   response: {
      201: stringType,
      400: stringType,
      403: stringType
   }
}

const loginUserSchema = {
   body: {
      type: 'object',
      required: ['userMail', 'userPassword'],
      properties: {
         userMail: stringType,
         userPassword: stringType,
      }
   },
   response: {
      202: {
         type: 'object',
         properties: {
            accessToken: stringType
         },
         401: stringType,
         404: stringType,
         500: stringType
      }
   }
}

const forgetPasswordSchema = {
   body: {
      type: 'object',
      required: ['userMail'],
      properties: {
         userMail: stringType
      }
   },
   response: {
      201: stringType,
      400: stringType,
      404: stringType
   }
}


const user = {
   type: 'object',
   properties: {
      user_id: stringType,
      user_mail: stringType,
      user_password: stringType,
   }
}

const getAllUsersShema = {
   response: {
      200: {
         type: 'array',
         items: user,
      }
   }
};

const getUserByIdShema = {
   params: {
      id: stringType,
   },
   response: {
      200: user,
      500: stringType
   }
};

module.exports = {
   getAllUsersShema,
   getUserByIdShema,
   addUserSchema,
   loginUserSchema,
   forgetPasswordSchema
}