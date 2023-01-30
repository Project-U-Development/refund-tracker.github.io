const excuteQuery = require("../db/db");

const getRefunds = async (request, reply) => {
  try {
    const refundResult = await excuteQuery("SELECT * FROM refunds", []);
    reply.status(200).send(refundResult);
  } catch (err) {
    reply.status(400).send(err);
  }
};
module.exports = { getRefunds };
