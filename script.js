
document.addEventListener('DOMContentLoaded', () => {
    const questionsList = document.getElementById('questionsList');
    const deleteForm = document.getElementById('deleteForm');
    const adminPasswordInput = document.getElementById('adminPassword');
    const deleteQuestionIdInput = document.getElementById('deleteQuestionId');

    const adminPassword = 'vDcjsP3c2VElaDU'; // 설정한 관리자 비밀번호

    const fetchQuestions = async (page = 1) => {
        try {
            const response = await fetch(`/.netlify/functions/get-questions?page=${page}`);
            const data = await response.json();
            renderQuestions(data.questions);
            renderPagination(data.totalPages, page);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const renderQuestions = (questions) => {
        questionsList.innerHTML = '';
        questions.forEach(question => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${question.title} - ${question.nickname}</span>`;
            questionsList.appendChild(li);
        });
    };

    const renderPagination = (totalPages, currentPage) => {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.textContent = i;
            pageLink.href = '#';
            pageLink.addEventListener('click', () => fetchQuestions(i));
            if (i === currentPage) {
                pageLink.style.fontWeight = 'bold';
            }
            pagination.appendChild(pageLink);
        }
    };

    deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const adminPasswordValue = adminPasswordInput.value;
        const deleteQuestionIdValue = deleteQuestionIdInput.value;

        if (adminPasswordValue !== adminPassword) {
            alert('관리자 비밀번호가 틀립니다.');
            return;
        }

        try {
            const response = await fetch('/.netlify/functions/delete-question', {
                method: 'POST',
                body: JSON.stringify({ id: deleteQuestionIdValue }),
            });

            const result = await response.json();
            if (result.success) {
                alert('문의사항이 삭제되었습니다.');
                fetchQuestions();
            } else {
                alert('문의사항 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    });

    fetchQuestions();
});
