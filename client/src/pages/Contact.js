import React, { useState } from 'react';
import './styles/ContactStyles.css';
import Layout from '../components/Layout/Layout';

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return ( <Layout>
        <section id="section-wrapper">
            <div className="box-wrapper">
                <div className="info-wrap">
                    <h2 className="info-title">Contact Information</h2>
                    <h3 className="info-sub-title">Fill up the form and our Team will get back to you within 24 hours</h3>
                    <ul className="info-details">
                        <li>
                            <i className="fas fa-phone-alt"></i>
                            <span>Phone:</span> <a href="tel:+ 1235 2355 98">+ 1235 2355 98</a>
                        </li>
                        <li>
                            <i className="fas fa-paper-plane"></i>
                            <span>Email:</span> <a href="mailto:khushboos.it.21@nitj.ac.in">info@autobookingWebsite.com</a>
                        </li>
                        <li>
                            <i className="fas fa-globe"></i>
                            <span>Website:</span> <a href="google.com">autobookingWebsite.com</a>
                        </li>
                    </ul>
                    <ul className="social-icons">
                        <li><a href="www.facebook.com"><i className="fab fa-facebook"></i></a></li>
                        <li><a href="www.facebook.com"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="www.facebook.com"><i className="fab fa-linkedin-in"></i></a></li>
                    </ul>
                </div>
                <div className="form-wrap">
                    <form onSubmit={handleSubmit}>
                        <h2 className="form-title">Send us a message</h2>
                        <div className="form-fields">
                            <div className="form-group f">
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="fname" placeholder="First Name" />
                            </div>
                            <div className="form-group f">
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="lname" placeholder="Last Name" />
                            </div>
                            <div className="form-group f">
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="email" placeholder="Mail" />
                            </div>
                            <div className="form-group f">
                                <input type="number" name="phone" value={formData.phone} onChange={handleChange} className="phone" placeholder="Phone" />
                            </div>
                            <div className="form-group f">
                                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message"></textarea>
                            </div>
                        </div>
                        <input type="submit" value="Send Message" className="submit-button" />
                    </form>
                </div>
            </div>
        </section></Layout>
    );
}

export default Contact;