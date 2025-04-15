import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9000/blog/viewblog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.blog);
      })
      .catch((err) => {
        console.error("Error loading blog:", err);
      });
  }, [id]);

  if (!blog) {
    return <div className="loading">Loading blog...</div>;
  }

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-card">
        <img src={blog.image} alt={blog.title} className="detail-image" />
        <h1 className="detail-title">{blog.title}</h1>

        <div className="detail-meta">
          <p><strong>Author:</strong> {blog.author?.username || "Unknown"}</p>
          <p><strong>Category:</strong> {blog.category}</p>
          <p><strong>Posted on:</strong> {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'No Date'}</p>
        </div>

        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></div>

        <div className="share-section">
          <h4>Share this article on social media</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
            </a>
            <a href="https://plus.google.com" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Google Plus" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
