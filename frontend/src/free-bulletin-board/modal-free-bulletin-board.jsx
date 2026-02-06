import React, { useState } from 'react'; // useState 추가 확인
import './modal-free-bulletin-board.css';

const ModalFreeBoard = ({ isOpen, onClose }) => {
  const [saveCount, setSaveCount] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  // 임시저장 로직
  const handleTempSave = () => {
    setSaveCount(prev => prev + 1);
    console.log("임시저장 데이터:", { title, content });
    alert("임시저장 되었습니다.");
  };

  // 서버 저장 함수
 const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
    }


    // if (!token) {
    //     alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    //     window.location.href = '/login';
    //     return;
    // }

    try {
        const response = await fetch('http://localhost:5000/api/boards', { 
            method: 'POST',credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
                category: 'general'
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("게시글이 성공적으로 등록되었습니다!");
            setTitle('');
            setContent('');
            setSaveCount(0);
            onClose();
        } else {
            console.error("서버 에러 응답:", data);
            
            if (response.status === 401) {
                alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
                localStorage.removeItem('accessToken'); // 변경
                window.location.href = '/login';
            } else {
                alert(`저장 실패: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
            }
        }
    } catch (error) {
        console.error("에러 발생:", error);
        alert("서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.");
    }
};
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="editor-toolbar">
          <div className="toolbar-left">
            <span>기본서체</span>
            <span className="separator">|</span>
            <button type="button"><b>B</b></button>
            <button type="button"><i>I</i></button>
            <button type="button"><u>U</u></button>
            <button type="button">T</button>
            <span className="separator">|</span>
            <button type="button">≡</button>
            <button type="button">≡</button>
            <button type="button">≡</button>
            <span className="separator">|</span>
            <button type="button">“</button>
            <button type="button">😊</button>
            <button type="button">田</button>
            <button type="button">➔</button>
          </div>
        </div>

        {/* 폼 태그로 감싸서 제출 처리 */}
        <form onSubmit={handleFinalSubmit}>
          <div className="modal-body">
            <input 
              type="text" 
              className="editor-title-input" 
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // 입력 값 반영
            />
            <div className="title-underline"></div>

            <textarea 
              className="editor-content-area" 
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)} // 입력 값 반영
            ></textarea>
          </div>

          <div className="modal-footer">
            <div className="footer-buttons">
              <button 
                type="button" 
                className="temp-save-btn" 
                onClick={handleTempSave}
              >
                임시저장 | <span className="save-count">{saveCount}</span>
              </button>
              <button type="submit" className="complete-btn">
                완료
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFreeBoard;