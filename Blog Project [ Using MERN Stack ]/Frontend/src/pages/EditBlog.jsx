import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    author: "",
  });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:9000/blog/viewblog/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const blog = data.blog;
        setFormData({
          title: blog.title,
          category: blog.category,
          description: blog.description,
          author: blog.author._id,
        });
        setExistingImage(blog.image);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error loading blog");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("category", formData.category);
    updatedData.append("description", formData.description);
    updatedData.append("author", formData.author);
    if (image) updatedData.append("image", image);

    const res = await fetch(`http://localhost:9000/blog/updateblog/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: updatedData,
    });

    const result = await res.json();

    if (res.ok) {
      toast.success("Blog updated");
      setTimeout(() => navigate("/blog/bloglist"), 1000);
    } else {
      toast.error(result.message || "Update failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Blog</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Title" />
          <input type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="Category" />
          <textarea name="description" rows="6" value={formData.description} onChange={handleChange} required placeholder="Description" />
          {existingImage && <img src={existingImage} alt="Current" width="150" />}
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit">Update Blog</button>
        </form>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditBlog;
