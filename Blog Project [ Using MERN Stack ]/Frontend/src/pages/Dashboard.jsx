import { useEffect, useState } from 'react';
import BlogCard from '../component/BlogCard';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';

// Import icons
import {
  FaLaptopCode,
  FaPlane,
  FaFutbol,
  FaHeartbeat,
  FaGraduationCap,
  FaRocket,
  FaNewspaper
} from 'react-icons/fa';

const blogsPerPage = 6;

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [auth] = useAuth();
  const [subscriptionEmail, setSubscriptionEmail] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/blog/viewblog')
      .then(res => res.json())
      .then(data => {
        setBlogs(data.blogs || []);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
      });
  }, []);

  const filteredBlogs = filter === 'All' ? blogs : blogs.filter(blog => blog.category === filter);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handleSubscribe = async () => {
    if (!subscriptionEmail) {
      toast.error("Please enter an email");
      return;
    }

    try {
      const res = await fetch('http://localhost:9000/subscription/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscriptionEmail })
      });

      const data = await res.json();
      res.ok ? toast.success(data.message) : toast.error(data.message);
      setSubscriptionEmail('');
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />

      {/* 💫 Hero Section */}
      <section className="hero-section">
        <h1>
          Heartfelt <span className="highlight">Reflections</span>: Stories of Love,<br />
          Loss, and Growth
        </h1>
        <p>
          Revision Welcomes to ultimate source for fresh perspectives! Explore curated
          content to enlighten, entertain and engage global readers.
        </p>
      </section>

      {/* 🔥 Trending Topics Section */}
      <section className="trending-topics">
        <h1>Explore Trending Topics</h1>
        <div className="topics-container">
          {[
            { icon: <FaNewspaper />, label: 'All' },
            { icon: <FaLaptopCode />, label: 'Technology' },
            { icon: <FaRocket />, label: 'Startup' },
            { icon: <FaFutbol />, label: 'Lifestyle' },
            { icon: <FaHeartbeat />, label: 'Health' },
            { icon: <FaGraduationCap />, label: 'Education' },
            { icon: <FaPlane />, label: 'Travel' }
          ].map(({ icon, label }) => (
            <button
              key={label}
              className={`topic-tab ${filter === label ? 'active' : ''}`}
              onClick={() => {
                setFilter(label);
                setCurrentPage(1);
              }}
            >
              <span className="topic-icon">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* 📄 Blog Cards */}
      <section className="blog-grid">
        {paginatedBlogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </section>

      {/* 🔢 Pagination */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ←
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
           →
        </button>
      </div>

      {/* ✉️ Subscribe */}
      <section className="subscribe-section">
        <h2>Stay Updated!</h2>
        <p>Subscribe to get the latest blog updates directly to your inbox.</p>
        <div className="subscribe-box">
          <input
            type="email"
            placeholder="demo@gmail.com"
            value={subscriptionEmail}
            onChange={(e) => setSubscriptionEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Dashboard;
