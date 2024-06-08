document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('questionsList')) {
        const questionsList = document.getElementById('questionsList');
        const deleteForm = document.getElementById('deleteForm');
        const adminPasswordInput = document.getElementById('adminPassword');
        const deleteQuestionIdInput = document.getElementById('deleteQuestionId');
        const modal = document.getElementById('modal');
        const closeModalButton = document.querySelector('.close');

        let adminPassword = '';

        const fetchAdminPassword = async () => {
            try {
                const response = await fetch('adminPassword.json');
                const data = await response.json();
                adminPassword = data.adminPassword;
            } catch (error) {
                console.error('Error fetching admin password:', error);
            }
        };

const fetchQuestions = async (page = 1) => {
    try {
        const response = await fetch(`/.netlify/functions/get-questions?page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);  // 데이터 구조 확인을 위해 콘솔에 출력

        if (!data || !Array.isArray(data)) {
            throw new Error('Invalid response format');
        }

        renderQuestions(data); // 변경된 부분
        renderPagination(data.totalPages, page);
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
};


const renderQuestions = (questions) => {
    questionsList.innerHTML = '';
    questions.forEach(question => {
        const title = question.title; // 수정된 부분
        const nickname = question.nickname; // 수정된 부분
        const li = document.createElement('li');
        li.textContent = `${title} - ${nickname}`;
        li.addEventListener('click', () => showQuestionDetail(question));
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
                    headers: {
                        'Content-Type': 'application/json'
                    }
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

        fetchAdminPassword()
    .then(fetchQuestions)
    .catch(error => console.error('Error fetching data:', error));


        closeModalButton.addEventListener('click', closeModal);

        document.getElementById('deleteModalForm').addEventListener('submit', deleteQuestionHandler);
    }

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

const showQuestionDetail = async (question) => {
    document.getElementById('modalTitle').textContent = question.title; // 수정된 부분
    document.getElementById('modalContent').textContent = question.content; // 수정된 부분
    document.getElementById('modal').dataset.questionId = question.ref.id;  // 수정된 부분
    document.getElementById('modal').style.display = 'block';
};
const deleteQuestionHandler = async (e) => {
    e.preventDefault();

    const deletePassword = document.getElementById('deletePassword').value;
    const questionId = document.getElementById('modal').dataset.questionId;  // 저장된 question ID 사용

    try {
        const response = await fetch('/.netlify/functions/delete-question', {
            method: 'POST',
            body: JSON.stringify({ id: questionId, password: deletePassword }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                alert('문의사항이 삭제되었습니다.');
                fetchQuestions();
                closeModal();
            } else {
                alert('문의사항 삭제에 실패했습니다.');
            }
        } else {
            console.error('Failed to delete question. Status:', response.status);
        }
    } catch (error) {
        console.error('Error deleting question:', error);
    }
};

const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
};
