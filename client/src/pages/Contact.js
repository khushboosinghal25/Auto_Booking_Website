import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import rightImg from './styles/right_img.png'
import arrowIcon from './styles/arrow_icon.png'
import './styles/ContactStyles.css'
function Contact() {

    return ( <Layout>
        <div className="contact-container">
            <form action="https://api.web3forms.com/submit" method="POST" className="contact-left">
                <div className="contact-left-title">
                    <h2>Get in Touch</h2>
                    <hr />
                </div>
                <input type="hidden" name="access_key" value="83228c67-36ff-4308-b6e8-a38ef039ebae" />
                <input type="text" name="name" placeholder="Your name" className="contact-inputs" required />
                <input type="email" name="email" placeholder="Your email" className="contact-inputs" required />
                <textarea name="message" className="contact-inputs" placeholder="Your message" required></textarea>
                <input type="hidden" name="redirect" value="https://web3forms.com/success" />
                <button type="submit">Submit <img src={arrowIcon} alt="" /></button>
            </form>
            <div className="contact-right">
                <img src={rightImg }alt="" />
            </div>
        </div>
       </Layout>
    );
}

export default Contact;