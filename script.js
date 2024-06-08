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
                console.error('관리자 비밀번호를 가져오는 중 오류 발생:', error);
            }
        };

        const showQuestionDetail = async (question) => {
            const modalTitle = document.getElementById('modalTitle');
            const modalContent = document.getElementById('modalContent');
            const passwordForm = document.getElementById('passwordForm');

            modalTitle.textContent = question.title;
            modalContent.textContent = "비밀번호를 입력하세요:";
            passwordForm.innerHTML = `
                <label for="userPassword">비밀번호:</label>
                <input type="password" id="userPassword" required>
                <button id="confirmPasswordBtn">확인</button>
            `;

            modal.style.display = 'block';

            const confirmPasswordBtn = document.getElementById('confirmPasswordBtn');

            confirmPasswordBtn.addEventListener('click', async () => {
                const userPassword = document.getElementById('userPassword').value;

                try {
                    const response = await fetch('/.netlify/functions/verify-password', {
                        method: 'POST',
                        body: JSON.stringify({ id: question.id, password: userPassword }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const result = await response.json();
                        if (result.success) {
                            modalContent.textContent = question.content;
                            const deleteBtn = document.createElement('button');
                            deleteBtn.textContent = '삭제';
                            deleteBtn.addEventListener('click', () => deleteQuestionHandler(question.id));
                            modalContent.appendChild(deleteBtn);
                        } else {
                            modalContent.textContent = '비밀번호가 올바르지 않습니다. 다시 입력해주세요.';
                        }
                    } else {
                        console.error('비밀번호 확인에 실패했습니다. 상태:', response.status);
                    }
                } catch (error) {
                    console.error('비밀번호 확인 중 오류 발생:', error);
                }
            });
        };

        const deleteQuestionHandler = async (questionId) => {
            const deletePassword = prompt('비밀번호를 입력하세요:');
            if (!deletePassword) return;

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
                    console.error('질문 삭제에 실패했습니다. 상태:', response.status);
                }
            } catch (error) {
                console.error('문의사항 삭제 중 오류 발생:', error);
            }
        };

        closeModalButton.addEventListener('click', closeModal);

        fetchAdminPassword()
            .then(fetchQuestions)
            .catch(error => console.error('데이터 가져오는 중 오류 발생:', error));
    }

    if (document.getElementById('questionForm')) {
        const questionForm = document.getElementById('questionForm');

        questionForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;

            try {
                const response = await fetch('/.netlify/functions/save-question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
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

const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
};
