// components/CommentSection.jsx
import { useState, useEffect } from "react";
import { FaComment } from "react-icons/fa";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const userId = "user123"; // Replace with real user ID

  const fetchComments = () => {
    fetch(`http://localhost:9000/blog/${blogId}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data.comments));
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9000/blog/${blogId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userId, text: commentText }),
    })
      .then((res) => res.json())
      .then(() => {
        setCommentText("");
        fetchComments(); // re-fetch after comment added
      });
  };

  return (
    <div className="comment-section">
      <button onClick={() => setShowComments(!showComments)} className="comment-toggle">
        <FaComment /> {showComments ? "Hide Comments" : "Show Comments"} ({comments.length})
      </button>
      {showComments && (
        <>
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              required
            />
            <button type="submit">Post Comment</button>
          </form>
          <ul className="comment-list">
            {comments.map((c, index) => (
              <li key={index}>
                <strong>{c.user}</strong>: {c.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CommentSection;
