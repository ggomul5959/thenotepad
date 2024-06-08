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
        // Save the delete request
        await client.query(
            q.Create(q.Collection('delete-requests'), {
                data: { questionId: id, timestamp: q.Now() }
            })
        );

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error creating delete request:', error);
        return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
    }
};
