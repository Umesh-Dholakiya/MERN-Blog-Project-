import { useNavigate } from "react-router-dom";
import "./BlogCard.css";
import { useAuth } from "../context/AuthContext";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const [auth , setAuth] = useAuth();

  const handleReadMore = () => {
    navigate(`/blog/${blog._id}`);
  };

  return (
    <div className="blog-card">
      <img className="blog-image" src={blog.image} alt={blog.title} />
      <div className="blog-content">  
        <span className="blog-category"> {blog.category}</span>
        <h3 className="blog-title"><strong>Title :</strong> {blog.title}</h3>
        <p className="blog-description"><strong>Description :</strong> {blog.description.slice(0, 100)}...</p>
        <p className="blog-meta">
          <strong>Author :</strong> {blog.author?.username || "Unknown Author"}

        </p>
        <p className="blog-meta">
          <strong>Published Date :</strong>{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <button className="readmore-btn" onClick={handleReadMore}>
          Read more →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
