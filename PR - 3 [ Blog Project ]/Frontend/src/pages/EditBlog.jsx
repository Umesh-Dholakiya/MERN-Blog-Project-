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
          title: blog.title || "",
          category: blog.category || "",
          description: blog.description || "",
          author: blog.author || "",
        });
        setExistingImage(blog.image);
      })
      .catch((err) => {
        console.error("Failed to load blog:", err);
        toast.error("Failed to load blog data!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("category", formData.category);
    updatedData.append("description", formData.description);
    updatedData.append("author", formData.author);
    if (image) {
      updatedData.append("image", image);
    }

    try {
      const response = await fetch(`http://localhost:9000/blog/updateblog/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: updatedData,
      });      

      const result = await response.json();

      if (response.ok) {
        toast.success("Blog updated successfully!");
        setTimeout(() => navigate("/blog/bloglist"), 1000);
      } else {
        toast.error(result.message || "Failed to update blog.");
      }
    } catch (err) {
      console.error("Failed to update blog:", err);
      toast.error("Something went wrong while updating!");
    }
  };

  return (
    <div className="edit-form-container" style={{ padding: "2rem" }}>
      <h2>Edit Blog</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            disabled
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="6"
            required
          />

          {existingImage && (
            <div style={{ marginBottom: "1rem" }}>
              <label>Current Image:</label>
              <br />
              <img src={existingImage} alt="Blog" width="150" />
            </div>
          )}

          <input type="file" onChange={handleImageChange} />

          <button type="submit" style={{ marginTop: "1rem" }}>
            Update Blog
          </button>
        </form>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditBlog;
