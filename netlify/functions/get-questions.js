const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
    const client = new faunadb.Client({ secret: process.env.Faunadb_SECRET });

    try {
        const response = await client.query(
            q.Map(
                q.Paginate(q.Match(q.Index('all_questions'))),
                q.Lambda('X', q.Get(q.Var('X')))
            )
        );
        const questions = response.data.map(item => item.data);
        return { statusCode: 200, body: JSON.stringify(questions) };
    } catch (error) {
        console.error('Error fetching questions:', error);
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};
