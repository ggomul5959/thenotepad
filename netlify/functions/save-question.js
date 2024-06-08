const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);

    const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

    try {
        const response = await client.query(
            q.Create(q.Collection('questions'), { data })
        );
        return { statusCode: 200, body: JSON.stringify(response) };
    } catch (error) {
        console.error('Error saving question:', error);
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};
