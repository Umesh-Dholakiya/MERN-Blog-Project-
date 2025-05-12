import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "./contact.css"; 
const Contact = () => {
    return (
        <>
            <Header />
            <div className="contact-container">
                <div className="contact-hero">
                    <h2>Feel Free to Contact Me</h2>
                    <p>Lorem ipsum dolor sit amet consectetur. Facilisis eu sit commodo sit.</p>
                    <p className="subtext">Phasellus elit sit sit dolor risus faucibus vel aliquam. Fames mattis.</p>
                </div>

                <div className="contact-form-section">
                    <form className="contact-form">
                        <h3>Ready to Get Started?</h3>
                        <div className="form-row">
                            <input type="text" placeholder="Name *" required />
                            <input type="email" placeholder="Email *" required />
                        </div>
                        <textarea placeholder="Your message *" rows="6" required></textarea>
                        <button type="submit">Submit Request</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
