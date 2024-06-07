document.addEventListener('DOMContentLoaded', () => {
    // 문서가 로드되면 실행될 코드

    // DOM 요소 가져오기
    const questionsList = document.getElementById('questionsList');
    const deleteForm = document.getElementById('deleteForm');
    const adminPasswordInput = document.getElementById('adminPassword');
    const deleteQuestionIdInput = document.getElementById('deleteQuestionId');

    // 관리자 비밀번호 설정
    const adminPassword = 'vDcjsP3c2VElaDU';

    // 문의사항 목록을 가져와서 렌더링하는 함수
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

    // 문의사항 목록을 렌더링하는 함수
    const renderQuestions = (questions) => {
        questionsList.innerHTML = '';
        questions.forEach(question => {
            const li = document.createElement('li');
            li.textContent = `${question.title} - ${question.nickname}`;
            questionsList.appendChild(li);
        });
    };

    // 페이지네이션을 렌더링하는 함수
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

    // 문의사항 삭제 양식 제출 이벤트 핸들러
    deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 입력된 관리자 비밀번호와 삭제할 문의사항 ID 가져오기
        const adminPasswordValue = adminPasswordInput.value;
        const deleteQuestionIdValue = deleteQuestionIdInput.value;

        // 입력된 관리자 비밀번호가 올바른지 확인
        if (adminPasswordValue !== adminPassword) {
            alert('관리자 비밀번호가 틀립니다.');
            return;
        }

        try {
            // 서버에 삭제 요청 보내기
            const response = await fetch('/.netlify/functions/delete-question', {
                method: 'POST',
                body: JSON.stringify({ id: deleteQuestionIdValue }),
            });

            // 응답 처리
            const result = await response.json();
            if (result.success) {
                alert('문의사항이 삭제되었습니다.');
                fetchQuestions(); // 삭제 후 문의사항 목록 다시 가져오기
            } else {
                alert('문의사항 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    });

    // 초기 문의사항 목록 가져오기
    fetchQuestions();
});
