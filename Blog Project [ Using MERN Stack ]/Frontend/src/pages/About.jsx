import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const About = () => {

    return (
        <>
            <Header />
            <div className="main_about">
                <section className="about-section">
                    <div className="overlay">
                        <div className="About_container">
                            <h1>About Our Blog</h1>
                        </div>
                    </div>
                </section>
                <section className="netflixo-section">
                    <div className="left-About_container">
                        <div className="text-content">
                            <h1>Join Our Thriving Blogging Community</h1>
                            <p>
                                Whether you are an aspiring writer, a passionate storyteller, or an eager reader, our blog platform is the perfect place for you. We strive to create an engaging space where ideas, knowledge, and creativity come to life.
                            </p>
                            <p>
                                From insightful articles to compelling personal stories, our community-driven platform encourages diverse perspectives. We empower bloggers to share their voices and readers to explore new horizons through thought-provoking content.
                            </p>
                        </div>
                        <div className="extra-content ">
                            <h2>Dive Into the World of Blogging</h2>
                            <p>
                                Discover a treasure trove of inspiring blog projects, covering topics like technology, lifestyle, travel, and more. Whether you're looking for inspiration or eager to start your own blogging journey, this is the place for you.
                            </p>
                        </div>

                    </div>
                    <div className="right-About_container">
                        <div className="image-About_container">
                            <img src="./src/assets/about_2.jpg" alt="Blogging" />
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default About;
