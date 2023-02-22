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
      401: {
         type: 'object',
         properties: {
            message: stringType,
            error: stringType
         }
      },
      500: stringType
   }
};

const createRefundSchema = {
   headers: headerRefundsSchema,
   body: {
      type: 'object',
      required: ['product_name', 'debtor', 'amount', 'due_date'],
      properties: {
         product_name: stringType,
         debtor: stringType,
         amount: { type: 'number' },
         currency: {
            type: 'string',
            enum: ['USD', 'EUR', 'GBP', 'UAH'],
         },
         due_date: {
            type: 'string',
            format: 'date'
         },
         reminder: {
            type: 'object',
            properties: {
               reminder_type: {
                  type: 'string',
                  enum: ['each', 'after']
               },
               frequency: { type: 'number' },
               time_unit: {
                  type: 'string',
                  enum: ['week', 'day']
               }
            }
         }
      },
   },
   response: {
      201: stringType
   },
};


module.exports = {
   getRefundsListSchema,
   createRefundSchema
}