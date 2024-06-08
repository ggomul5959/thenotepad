const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { id } = JSON.parse(event.body);

    if (!id) {
        return { statusCode: 400, body: 'ID is required.' };
    }

    const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

    try {
        await client.query(
            q.Delete(q.Ref(q.Collection('questions'), id))
        );
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error deleting question:', error);
        return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
    }
};
