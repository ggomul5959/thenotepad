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

    const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

    try {
        // Fetch the question document to get the stored password
        const questionDoc = await client.query(
            q.Get(q.Ref(q.Collection('questions'), id))
        );
        
        // Verify the password
        if (questionDoc.data.password !== password) {
            return { statusCode: 401, body: JSON.stringify({ success: false, error: 'Incorrect password' }) };
        }

        // Delete the question document
        await client.query(
            q.Delete(q.Ref(q.Collection('questions'), id))
        );

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error deleting question:', error);
        return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
    }
};
