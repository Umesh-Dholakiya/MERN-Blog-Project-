import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './BlogPage.css';

const BlogPage = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`http://localhost:9000/blog/viewblog/category/${categoryName}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogs(data.blogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [categoryName]);

    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <>
            <Header />
            <div className="blogpage-container">
                <h1 className="blogpage-title">
                    {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Blogs
                </h1>

                {loading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="blog-grid">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <div key={blog._id} className="blog-card">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="blog-card-image"
                                    />
                                    <div className="blog-card-body">
                                        <span className="blog-category">{categoryName}</span>
                                        <h3 className="blog-card-title">{blog.title}</h3>
                                        <p className="blog-card-desc">{blog.description}</p>
                                        <button
                                            className="read-more-btn"
                                            onClick={() => handleReadMore(blog._id)}
                                        >
                                            Read more →
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-blogs">
                                <img src="/no-blogs.svg" alt="No Blogs" className="no-blogs-image" />
                                <p>No blogs available in this category yet!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;
