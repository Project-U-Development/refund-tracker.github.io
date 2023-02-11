const stringType = { type: 'string' };

const refunds = {
   type: 'object',
   properties: {
      refund_id: stringType,
      creation_time: {
         type: 'string',
         format: 'datetime'
      },
      product_name: stringType,
      debtor: stringType,
      amount$: { type: 'number' },
      currency: {
         type: 'string',
         enum: ['USD', 'EUR', 'GBP', 'UAH']
      },
      due_date: {
         type: 'string',
         format: 'date'
      },
      if_completed: {
         type: 'string',
         enum: ['yes', 'no', 'deleted']
      }
   }
};

const headerRefundsSchema = {
   type: 'object',
   required: ['authorization'],
   properties: {
      authorization: stringType,
   },
};


const getRefundsListSchema = {
   headers: headerRefundsSchema,
   response: {
      200: {
         type: 'array',
         items: refunds
      },
      100: stringType,
      500: stringType
   }
};

module.exports = {
   getRefundsListSchema
}