import { useEffect, useState } from 'react';
import './BlogList.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import profileImg from '../assets/profile.png';
import { useAuth } from '../context/AuthContext';


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9000/blog/viewblog', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(data => setBlogs(data.blogs || []))
      .catch(err => console.error('Failed to fetch blogs:', err));
  }, []);

  const deleteBlog = async (id) => {
    try {
      await fetch(`http://localhost:9000/blog/deleteblog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editblog/${id}`);
  };

  return (
    <div className="main-content">
      <h2 className="section-title">All blogs</h2>
      <div className="table-container">
        <table className="blog-table">
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Blog Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="author-cell">
                  <img
                    src={profileImg}
                    alt="Admin"
                    className="admin-avatar"
                  />
                  <span>{blog.author?.username || 'Unknown Author'}</span>
                </td>
                <td>{blog.title || 'Untitled'}</td>
                <td>{blog.category || 'Uncategorized'}</td>
                <td>{blog.date ? new Date(blog.date).toLocaleDateString() : 'No Date'}</td>
                <td className="action-cell">
                  <FaEdit className="edit-icon" onClick={() => handleEdit(blog._id)} />
                  <FaTrash className="delete-icon" onClick={() => deleteBlog(blog._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
