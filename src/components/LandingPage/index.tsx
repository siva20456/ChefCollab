import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Cookies from 'js-cookie';

interface Service {
    title: string;
    description: string;
    icon: string; // You can use an icon library or your custom icons
}

const servicesData: Service[] = [
    {
        title: 'Restaurant',
        description: 'Connect with Top Talented Chefs and give them culinary oppurtunities.',
        icon: 'icon-recipe',
    },
    {
        title: 'Chef Networking',
        description: 'Connect with Top Restuarents and discover their culinary secrets.',
        icon: 'icon-chef',
    },
    {
        title: 'Chef-Restaurant Interactivity',
        description: 'Join our Platform and get an International level interactivity.',
        icon: 'icon-cooking-class',
    },
];


const LandingPage: React.FC = () => {


    const [showContactForm, setShowContactForm] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const jwt_token = Cookies.get('jwt_token');
        const user_type = Cookies.get('user_type')
        console.log(user_type)
        if (user_type == 'Chef') {
            //need to check authorization

            navigate('/ChefHome', { replace: true })
        } else if (user_type == 'Restaurant') {
            //need to  check Auth

            navigate('/RestHome', { replace: true })
        }
    }, [])

    const toggleContactForm = () => {
        setShowContactForm(!showContactForm);
    };

    const gotoSignIn = () => {
        navigate('/register-signin', { replace: true })
    }

    const restSignIn = () => {
        navigate('/restaurent-sign', { replace: true })
    }

    return (
        <div className="landing-page">
            <header className='fixed-top'>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#about-us">About Us</a></li>
                        <li><a href="#services-section">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href='' onClick={restSignIn}>Restaurant?</a></li>
                    </ul>
                </nav>
            </header>



            <main>
                <section className="hero">
                    <div className="hero-content">
                        <h1>Welcome to FindUrChef</h1>
                        <p>Your Culinary Connection</p>
                        <a href="#get-started" className="btn">Get Started</a>
                    </div>
                </section>


                <section id="get-started" className="get-started">
                    <h2>Get Started Today</h2>
                    <p>Join our platform and connect with talented chefs and food lovers.</p>
                    <button className="btn" onClick={gotoSignIn}>Sign Up</button>
                </section>

                <section id='about-us' className="about-us">
                    <div className="container">
                        <h2>About Us</h2>
                        <p>
                            FindUrChef is a platform dedicated to bringing together food
                            enthusiasts, home chefs, and professional cooks. We believe that food
                            is a universal language, and our mission is to connect people through
                            their love for cooking and sharing delicious recipes.
                        </p>
                        <p>
                            Whether you're a passionate home cook or a seasoned chef, you'll find
                            a welcoming community here. Share your favorite recipes, discover new
                            culinary techniques, and connect with like-minded individuals who
                            share your culinary interests.
                        </p>
                    </div>
                </section>


                <section id='services-section' className="services-section">
                    <div className="container">
                        <h2>Our Services</h2>
                        <div className="services-list">
                            {servicesData.map((service, index) => (
                                <div className="service-item" key={index}>
                                    <div className="service-icon">
                                        <i className={service.icon}></i>
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id='contact'>
                    <div className="contact-us-section">
                        <h2>Contact Us</h2>
                        <p>Have questions or feedback? Reach out to us.</p>

                        <button className="toggle-button" onClick={toggleContactForm}>
                            {showContactForm ? 'Hide Contact Form' : 'Show Contact Form'}
                        </button>

                        {showContactForm && (
                            <div className="contact-form">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" placeholder="Your Name" />

                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" placeholder="Your Email" />

                                <label htmlFor="message">Message:</label>
                                <textarea id="message" placeholder="Your Message"></textarea>

                                <button className="submit-button">Submit</button>
                            </div>
                        )}
                    </div>
                </section>

            </main>

            <footer>
                <p>&copy; {new Date().getFullYear()} FindUrChef</p>
            </footer>
        </div>
    );
};

export default LandingPage;
