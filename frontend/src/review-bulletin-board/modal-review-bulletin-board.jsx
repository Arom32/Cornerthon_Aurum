import React, { useState } from 'react'; // useState 추가 확인
import './modal-review-bulletin-board.css';

const ModalReviewBoard = ({ isOpen, onClose }) => {
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
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      // 백엔드가 여기다 실제 API 주소로 교체해주셔야함.
      const response = await fetch('http://localhost:8080/api/board', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          date: new Date().toLocaleDateString('ko-KR'), // 가독성 좋은 날짜 포맷
          views: 0
        }),
      });

      if (response.ok) {
        alert("게시글이 성공적으로 등록되었습니다!");
        onClose(); 
        window.location.reload(); 
      } else {
        alert("서버 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("서버와 통신할 수 없습니다. API 주소를 확인해주세요.");
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

export default ModalReviewBoard;