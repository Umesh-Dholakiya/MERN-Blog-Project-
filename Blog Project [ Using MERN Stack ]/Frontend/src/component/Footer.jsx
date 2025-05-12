import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo and Description */}
                <div className="footer-section about">
                    <img src={logo} alt="logo" className="logo" />

                    <p>
                        Welcome to ultimate source for fresh perspectives! Explore curated content to enlighten, entertain and engage global readers.
                    </p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f" /></a>
                        <a href="#"><i className="fab fa-x-twitter" /></a>
                        <a href="#"><i className="fab fa-instagram" /></a>
                        <a href="#"><i className="fab fa-linkedin-in" /></a>
                    </div>
                </div>

                {/* Homepages */}
                <div className="footer-section">
                    <h3>Homepages</h3>
                    <ul>
                        <li><a href="#">Classic List</a></li>
                        <li><a href="#">Classic Grid</a></li>
                        <li><a href="#">Classic Overlay</a></li>
                        <li><a href="#">Hero Slider</a></li>
                        <li><a href="#">Featured Posts</a></li>
                    </ul>
                </div>

                {/* Categories */}
                <div className="footer-section">
                    <h3>Categories</h3>
                    <ul>
                        <li><a href="/category/technology">Technology</a></li>
                        <li><a href="/category/travel">Travel</a></li>
                        <li><a href="/category/health">Health</a></li>
                        <li><a href="/category/lifestyle">Lifestyle</a></li>
                    </ul>
                </div>

                {/* Pages */}
                <div className="footer-section">
                    <h3>Pages</h3>
                    <ul>
                        <li><a href="/about">About</a></li>
                        <li><a href="/categories">Categories</a></li>
                        <li><a href="/contact">Contacts</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                © 2025 — blogger Project. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
