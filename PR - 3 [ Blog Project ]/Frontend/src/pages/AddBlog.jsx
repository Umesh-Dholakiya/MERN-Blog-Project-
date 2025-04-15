import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddBlog.css';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image || !category) {
      toast.error('Please fill all fields!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('author', auth?.user?._id);

    try {
      const res = await fetch('http://localhost:9000/blog/addblog', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Blog added successfully!');
        setTimeout(() => navigate('/blog/addblog'), 1500);
      } else {
        toast.error(data.msg || 'Failed to add blog');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="add-blog-wrapper">
      <h3 className='text-center mb-5'>Add Blog 📝</h3>
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit} className="add-blog-form" encType="multipart/form-data">
        <div className="form-group">
          <label>Upload thumbnail</label>
          <div className="upload-box">
            <label htmlFor="imageInput">Upload</label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Blog title</label>
          <input
            type="text"
            placeholder="Type here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Blog Description</label>
          <textarea
            placeholder="write content here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Blog category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Technology">Technology</option>
            <option value="Startup">Startup</option>
            <option value="Health">Health</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">ADD</button>
      </form>
    </div>
  );
};

export default AddBlog;
