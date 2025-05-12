import React, { useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';
import './Category.css';

const categories = [
    { name: "Lifestyle", image: "src/assets/lifestyle.webp", path: "/category/lifestyle" },
    { name: "Technology", image: "src/assets/technology.webp", path: "/category/technology" },
    { name: "Startup", image: "src/assets/startup.webp", path: "/category/startup" },
    { name: "Health", image: "src/assets/health.webp", path: "/category/health" },
    { name: "Travel", image: "src/assets/travel.webp", path: "/category/travel" },
    { name: "Education", image: "src/assets/education.webp", path: "/category/education" },
];

const Category = () => {
    const [subscriptionEmail, setSubscriptionEmail] = useState('');

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

    return (
        <>
            <Header />
            <div className="category-container">
                <h1 className="category-title">Categories</h1>
                <div className="category-grid">
                    {categories.map((category, index) => (
                        <Link to={category.path} key={index} className="category-card">
                            <div className="category-image-wrapper">
                                <img src={category.image} alt={category.name} className="category-image" />
                                <div className="category-name">{category.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
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
}

export default Category;
