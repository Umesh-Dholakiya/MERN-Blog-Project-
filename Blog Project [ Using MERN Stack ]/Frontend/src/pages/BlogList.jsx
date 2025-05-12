import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import profileImg from '../assets/profile.png';
import { useAuth } from '../context/AuthContext';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9000/blog/viewblog', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => setBlogs(data.blogs || []))
      .catch(err => console.error('Error fetching blogs:', err));
  }, []);

  const deleteBlog = async (id) => {
    await fetch(`http://localhost:9000/blog/deleteblog/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setBlogs(prev => prev.filter(blog => blog._id !== id));
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
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="author-cell">
                  <img src={profileImg} alt="Author" className="admin-avatar" />
                  <span>{blog.author?.username || 'Unknown'}</span>
                </td>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  <FaEdit className="edit-icon" onClick={() => handleEdit(blog._id)} /> &nbsp;&nbsp; 
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
