document.addEventListener('DOMContentLoaded', () => {
    const questionsList = document.getElementById('questionsList');
    const deleteForm = document.getElementById('deleteForm');
    const adminPasswordInput = document.getElementById('adminPassword');
    const deleteQuestionIdInput = document.getElementById('deleteQuestionId');
    const modal = document.getElementById('modal');
    const closeModalButton = document.querySelector('.close');
    const viewModalForm = document.getElementById('viewModalForm');
    const viewPasswordInput = document.getElementById('viewPassword');
    const modalContent = document.getElementById('modalContent');
    const deleteRequestButton = document.getElementById('deleteRequestButton');

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

    const showQuestionDetail = (question) => {
        document.getElementById('modalTitle').textContent = question.title;
        viewPasswordInput.value = '';
        modalContent.style.display = 'none';
        deleteRequestButton.style.display = 'none';
        modalContent.textContent = question.content;
        modal.dataset.questionId = question.id;
        modal.dataset.questionPassword = question.password;
        modal.style.display = 'block';
    };

    viewModalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputPassword = viewPasswordInput.value;
        const storedPassword = modal.dataset.questionPassword;

        if (inputPassword === storedPassword) {
            modalContent.style.display = 'block';
            deleteRequestButton.style.display = 'block';
        } else {
            alert('비밀번호가 틀립니다.');
        }
    });

    deleteRequestButton.addEventListener('click', async () => {
        const questionId = modal.dataset.questionId;
        try {
            const response = await fetch('/.netlify/functions/delete-request', {
                method: 'POST',
                body: JSON.stringify({ id: questionId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.success) {
                alert('삭제 요청이 접수되었습니다.');
                closeModal();
            } else {
                alert(`삭제 요청에 실패했습니다. 오류: ${result.error}`);
            }
        } catch (error) {
            console.error('Error submitting delete request:', error);
        }
    });

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
                body: JSON.stringify({ id: deleteQuestionIdValue, password: adminPasswordValue }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.success) {
                alert('문의사항이 삭제되었습니다.');
                fetchQuestions();
            } else {
                alert(`문의사항 삭제에 실패했습니다. 오류: ${result.error}`);
            }
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    });

    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeModalButton.addEventListener('click', closeModal);

    fetchAdminPassword().then(fetchQuestions).catch(error => console.error('Error fetching data:', error));
});
