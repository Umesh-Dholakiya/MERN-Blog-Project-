import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // Fetch blog
    fetch(`http://localhost:9000/blog/viewblog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.blog);
        // Simulate like check (you can replace this with user logic)
        const userLiked = data.blog.likes?.includes("userId");
        setLiked(userLiked);
      })
      .catch((err) => console.error("Error loading blog:", err));

    // Fetch comments
    fetch(`http://localhost:9000/blog/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data.comments))
      .catch((err) => console.error("Error loading comments:", err));
  }, [id]);

  const handleLike = () => {
    fetch(`http://localhost:9000/blog/like/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(true);
        setBlog({ ...blog, likes: data.totalLikes });
      })
      .catch((err) => console.error("Error liking blog:", err));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9000/blog/comment/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newComment }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
        setNewComment("");
      })
      .catch((err) => console.error("Error submitting comment:", err));
  };

  if (!blog) return <div className="loading">Loading blog...</div>;

  return (
    <>
      <Header />
      <div className="blog-detail-container">
        <div className="blog-detail-card">
          <div className="blog-meta">
            <h1 className="detail-title">{blog.title}</h1>
            <div className="detail-meta">
              <span>
                Author: <strong>{blog.author?.username || "Unknown"}</strong>
              </span>
              <span>
                Category: <strong>{blog.category}</strong>
              </span>
            </div>
          </div>

          <img src={blog.image} alt={blog.title} className="detail-image" />

          <div
            className="detail-content"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>

          <div className="interaction-buttons">
            <button
              className="like-button"
              onClick={handleLike}
              disabled={liked}
            >
              👍 {liked ? "Liked" : "Like"} ({blog.likes?.length || 0})
            </button>

            <button
              className="share-button"
              onClick={() => navigator.share({
                title: blog.title,
                text: "Check out this blog!",
                url: window.location.href,
              })}
            >
              📤 Share
            </button>

            <button
              className="comment-toggle"
              onClick={() => setShowComments(!showComments)}
            >
              💬 {showComments ? "Hide" : "Show"} Comments ({comments.length})
            </button>
          </div>

          {showComments && (
            <div className="comment-section">
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  required
                />
                <button type="submit">Post Comment</button>
              </form>
              <ul className="comment-list">
                {comments.map((c) => (
                  <li key={c._id}>
                    <strong>{c.user?.username || "User"}:</strong> {c.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
