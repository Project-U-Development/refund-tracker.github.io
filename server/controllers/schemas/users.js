 const typeString = {type: 'string'}

const loginUserSchema = {
    body: {
        type: 'object',
        required: ['user_mail', 'user_password'],
        properties: {
            user_id: typeString,
            user_mail: {
                type: 'string',
                format: 'email'
            },
            user_password: typeString,
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                accessToken: typeString,
                },
        },
    },
};

  
module.exports = { loginUserSchema };