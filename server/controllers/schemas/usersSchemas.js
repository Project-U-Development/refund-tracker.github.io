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
      201: {
         type: 'object',
         properties: {
            message: stringType,
            accessToken: stringType
         }
      },
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
         }
      },
      401: stringType,
      404: stringType,
      500: stringType
   }
}

const user = {
   type: 'object',
   properties: {
      user_id: stringType,
      user_mail: stringType,
      user_password: stringType,
      user_reset_password_code: stringType,
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
   loginUserSchema
}