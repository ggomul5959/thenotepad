const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
    const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

    // 쿼리 파라미터에서 페이지 번호를 읽습니다.
    const page = parseInt(event.queryStringParameters.page) || 1;
    const pageSize = 10; // 페이지당 항목 수
    const startIndex = (page - 1) * pageSize;

    try {
        const response = await client.query(
            q.Map(
                q.Paginate(q.Match(q.Index('all_questions')), { size: pageSize, after: startIndex }),
                q.Lambda('X', q.Get(q.Var('X')))
            )
        );
        const questions = response.data.map(item => item.data);

        // 총 질문 수를 가져옵니다.
        const totalResponse = await client.query(
            q.Count(q.Match(q.Index('all_questions')))
        );
        const totalPages = Math.ceil(totalResponse / pageSize);

        return {
            statusCode: 200,
            body: JSON.stringify({ questions, totalPages })
        };
    } catch (error) {
        console.error('Error fetching questions:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
