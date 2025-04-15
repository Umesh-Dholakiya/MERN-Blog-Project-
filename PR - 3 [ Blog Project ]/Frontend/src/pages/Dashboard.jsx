import { useEffect, useState } from 'react';
import BlogCard from '../component/BlogCard';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('All');
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

  const filteredBlogs = (filter === 'All' ? blogs : blogs.filter(blog => blog.category === filter)) || [];

  const handleSubscribe = async () => {
    if (!subscriptionEmail) {
      toast.error("Please enter an email");
      return;
    }

    try {
      const res = await fetch('http://localhost:9000/subscription/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: subscriptionEmail })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Subscription successful");
        setSubscriptionEmail('');
      } else {
        toast.error(data.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />

      {/* Hero Banner */}
      <section className="hero-banner">
        <h1>Welcome to Blogify!</h1>
        <p>Explore top stories, insights & opinions from around the world.</p>
      </section>

      {/* Latest Blogs */}
      <section className="latest-blogs">
        <h1>Latest Blogs</h1>
        <p>Discover the freshest content from our talented writers.</p>
        <div className="subscribe-box">
          <input
            type="email"
            placeholder="demo@gmail.com"
            value={subscriptionEmail}
            onChange={(e) => setSubscriptionEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
        <div className="category-filters">
          {['All', 'Technology', 'Startup', 'Lifestyle', 'Health', 'Education'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={filter === cat ? 'active' : ''}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="blog-grid">
        {filteredBlogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </section>

      {/* Featured Authors */}
      <section className="featured-authors">
        <h2>Featured Authors</h2>
        <div className="author-cards">
          {[1, 2, 3].map((id) => (
            <div key={id} className="author-card">
              <img src={`https://i.pravatar.cc/150?img=${id}`} alt="Author" />
              <h4>Author Name {id}</h4>
              <p>Writes about tech, startups & lifestyle.</p>
            </div>
          ))}
        </div>
      </section>


      {/* Community Highlights */}
      <section className="community-highlights">
        <h2>Community Highlights</h2>
        <div className="highlight-boxes">
          <div className="highlight-card">
            <h4>Top Commenter</h4>
            <p>Jane Doe with 120+ helpful comments this month.</p>
          </div>
          <div className="highlight-card">
            <h4>Most Liked Blog</h4>
            <p>“10 Productivity Hacks” by Alex got 540+ likes!</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Dashboard;
