document.addEventListener('DOMContentLoaded', () => {
    // 문의사항 게시판 페이지
    if (document.getElementById('questionsList')) {
        const questionsList = document.getElementById('questionsList');
        const deleteForm = document.getElementById('deleteForm');
        const adminPasswordInput = document.getElementById('adminPassword');
        const deleteQuestionIdInput = document.getElementById('deleteQuestionId');

        let adminPassword = '';

        // 비밀번호를 JSON 파일에서 가져오는 함수
        const fetchAdminPassword = async () => {
            try {
                const response = await fetch('path/to/adminPassword.json'); // 올바른 파일 경로를 지정
                const data = await response.json();
                adminPassword = data.adminPassword;
            } catch (error) {
                console.error('Error fetching admin password:', error);
            }
        };

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
                li.textContent = `${question.title} - ${question.nickname}`;
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

        // 비밀번호를 가져오고 나서 질문을 가져옵니다.
        fetchAdminPassword().then(fetchQuestions);
    }

    // 문의사항 제출 페이지
    if (document.getElementById('questionForm')) {
        const questionForm = document.getElementById('questionForm');

        questionForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const title = document.getElementById('title').value;
            const nickname = document.getElementById('nickname').value;
            const password = document.getElementById('password').value;
            const content = document.getElementById('content').value;

            try {
                const response = await fetch('/.netlify/functions/save-question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
                        nickname,
                        password,
                        content
                    })
                });

                if (response.ok) {
                    alert('문의사항이 제출되었습니다.');
                    questionForm.reset();
                } else {
                    const errorMessage = await response.text();
                    alert(`문의사항 제출에 실패했습니다. 오류: ${errorMessage}`);
                }
            } catch (error) {
                console.error('문의사항 제출 중 오류 발생:', error);
                alert('문의사항 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        });
    }
});

