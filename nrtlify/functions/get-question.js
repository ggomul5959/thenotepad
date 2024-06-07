const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { id, password } = JSON.parse(event.body);

  if (!id || !password) {
    return { statusCode: 400, body: 'ID and password are required.' };
  }

  try {
    const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
    const result = await client.query(q.Get(q.Ref(q.Collection('questions'), id)));

    if (result.data.password === password) {
      return { statusCode: 200, body: JSON.stringify(result.data) };
    } else {
      return { statusCode: 401, body: 'Unauthorized' };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
