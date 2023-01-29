const typeString = { type: 'string' }

const refund = {
    type: 'object',
    properties: {
        refund_id: typeString,
        creation_time : { 
            type: 'string',
            format: 'datetime',
            formatMaximum: '2020-01-01 00:00:00'
        },
        product_name: typeString,
        debtor: typeString,
        amount: { type:'number' },
        currency: {
            type: 'string',
            enum: ['USD', 'EUR', 'GBP','UAH'],
        },
        due_date: { 
            type : 'string',
            format: 'date', 
            formatMaximum: '2020-01-01' 
        },
        user_id : { type: 'string' },
        if_completed: {
            type: 'string',
            enum: ['yes', 'no', 'deleted'],
        }

    },
};

const headerSchema = {
    type: 'object',
    required: ['token'],
    properties: {
      token: typeString,
    },
  };

const createRefundSchema = {
    header: headerSchema,
    body: {
        type: 'object',
        required: ['product_name', 'debtor','amount','due_date'],
        properties: {
            product_name: typeString,
            debtor: typeString,
            amount: { type:'number' },
            currency: {
                type: 'string',
                enum: ['USD', 'EUR', 'GBP','UAH'],
            },
            due_date: { 
                type : 'string',
                format: 'date', 
                formatMaximum: '2020-01-01' 
            }
        },
    },
    response: {
        200: typeString, // sending a simple message as string
    },
};


module.exports = {
  createRefundSchema
};