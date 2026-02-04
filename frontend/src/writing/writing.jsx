import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import './writing.css';
import Header from '../Header/Header.jsx';

const BACK_URL = import.meta.env.VITE_BACK_URL || 'http://localhost:5000';

const Writing = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); 
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

    // 게시물 및 댓글 조회
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 게시물 상세 조회
                const postResponse = await fetch(`${BACK_URL}/api/boards/{id}`);
                const postResult = await postResponse.json();

                if (postResult.success) {
                    setPost(postResult.data);
                    setEditedTitle(postResult.data.title);
                    setEditedContent(postResult.data.content);
                }

                // 댓글 조회
                const commentsResponse = await fetch(`${BACK_URL}/api/boards/$id}/comments`);
                const commentsResult = await commentsResponse.json();

                if (commentsResult.success) {
                    setComments(commentsResult.data);
                }
            } catch (error) {
                console.log("데이터 연결 실패 ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // 댓글 작성
    const Commentwriting = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`${BACK_URL}/api/boards/{id}/comments`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    content: newComment,
                    // author: "user" // 실제로는 로그인된 사용자 정보 사용
                })
            });
            const result = await response.json();
            
            if (result.success) {
                setComments([result.data, ...comments]);
                setNewComment(""); 
            }
        } catch (error) {
            alert("댓글 등록에 실패했습니다.");
        }
    };

    // 댓글 삭제
    const deleteComment = async (commentId) => {
        if (!confirm("댓글을 삭제하시겠습니까?")) return;

        try {
            const response = await fetch(`${BACK_URL}/api/boards/${id}/comments/${commentId}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (result.success) {
                setComments(comments.filter(comment => comment._id !== commentId));
                alert("댓글이 삭제되었습니다.");
            }
        } catch (error) {
            alert("댓글 삭제에 실패했습니다.");
        }
    };

    // 댓글 수정
    const updateComment = async (commentId, newContent) => {
        try {
            const response = await fetch(`${BACK_URL}/api/boards/${id}/comments/${commentId}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    content: newContent
                })
            });
            const result = await response.json();

            if (result.success) {
                setComments(comments.map(comment => 
                    comment._id === commentId ? result.data : comment
                ));
                alert("댓글이 수정되었습니다.");
            }
        } catch (error) {
            alert("댓글 수정에 실패했습니다.");
        }
    };

    // 좋아요 토글
    const toggleLike = async () => {
        try {
            const response = await fetch(`${BACK_URL}/api/boards/${id}/like`, {
                method: 'POST',
            });
            const result = await response.json();

            if (result.success) {
                setPost({
                    ...post,
                    countLikes: result.data.countLikes,
                    isLiked: result.data.isLiked
                });
            }
        } catch (error) {
            alert("좋아요 처리에 실패했습니다.");
        }
    };

    // 게시물 수정
    const updatePost = async () => {
        try {
            const response = await fetch(`${BACK_URL}/api/boards/${id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    title: editedTitle,
                    content: editedContent
                })
            });
            const result = await response.json();

            if (result.success) {
                setPost(result.data);
                setIsEditing(false);
                alert("게시물이 수정되었습니다.");
            }
        } catch (error) {
            alert("게시물 수정에 실패했습니다.");
        }
    };

    // 게시물 삭제
    const deletePost = async () => {
        if (!confirm("게시물을 삭제하시겠습니까?")) return;

        try {
            const response = await fetch(`${BACK_URL}/api/boards/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (result.success) {
                alert("게시물이 삭제되었습니다.");
                window.location.href = '/free'; // 목록으로 이동
            }
        } catch (error) {
            alert("게시물 삭제에 실패했습니다.");
        }
    };

    if (loading) return <div>로딩 중</div>;

    return (
        <div className="container">
            <Header />
            <div className='writing-detail'>
                <article className='writing-section'>
                    {post ? (
                        <>
                            {isEditing ? (
                                <>
                                    <input 
                                        type="text"
                                        className="edit-title-input"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                    />
                                    <hr className="divider" />
                                    <textarea 
                                        className="edit-content-textarea"
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                    />
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                        <button onClick={updatePost} className="save-btn">저장</button>
                                        <button onClick={() => setIsEditing(false)} className="cancel-btn">취소</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h1 className="post-title">{post.title}</h1>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button onClick={() => setIsEditing(true)} className="edit-btn">수정</button>
                                            <button onClick={deletePost} className="delete-btn">삭제</button>
                                        </div>
                                    </div>
                                    <hr className="divider" />
                                    <div className="post-body">
                                        {post.content}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <p>게시글을 찾을 수 없습니다.</p>
                    )}
                    <div className="like-section">
                        <button className="like-btn" onClick={toggleLike}>
                            <span className="heart-icon">♥</span> 좋아요 {post?.countLikes || 0}
                        </button>
                    </div>
                </article>

                <section className='comment-section'>
                    <h3 className="comment-title">댓글</h3>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={comment._id || index} className="comment-item">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="comment-author">{comment.creator?.username || comment.author}</span>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <button 
                                            onClick={() => {
                                                const newContent = prompt("댓글 수정", comment.content);
                                                if (newContent) updateComment(comment._id, newContent);
                                            }}
                                            className="comment-edit-btn"
                                        >
                                            수정
                                        </button>
                                        <button 
                                            onClick={() => deleteComment(comment._id)}
                                            className="comment-delete-btn"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                                <span className="comment-text">{comment.content}</span>
                            </div>
                        ))
                    ) : (
                        <p className="no-comment">첫 번째 댓글을 남겨보세요!</p>
                    )}
                </section>

                <section className='reply-section'>
                    <form onSubmit={Commentwriting} className="comment-form">
                        <input 
                            type="text" 
                            className="comment-input" 
                            placeholder="댓글 쓰기" 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type="submit" className="comment-submit-btn">등록</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Writing;