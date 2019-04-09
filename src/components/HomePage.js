/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from './Navbar';
import '../css/App.css';


const Homepage = () => (<div className = "Abiola">
    <Navbar name='homepage'/>
    <main className="main-wrap"></main>

    <div id="quote">
        <blockquote>
            SendIT is a leading logistics and distribution s        ervices company
                              established in 2009. We offer a wide array of express courier and logistic
                support solutions to our various customers.</blockquote>
    </div>
    <footer>
        <div className="wrapper">
            <ul>

                <li className="tw">Helpful Links</li>
                <li className="tw">Services</li>
                <li className="tw">FAQs</li>
                <li className="tw">Contact</li>
                <li className="tw">Services</li>
                <li className="tw">Domestic Services</li>
                <li className="tw">International Services</li>
                <li className="tw">Mailroom & Warehousing</li>
                <li className="tw">Helpful Links</li>
                <li className="tw">Services</li>
                <li className="tw">FAQs</li>
                <li className="tw">Contact</li>
                <li className="tw">Services</li>
            </ul>
            <div id="copyright">&copy; 2018 Marble. All rights reserved. Balogun Biola.</div>
        </div>
    </footer>
</div>);

export default Homepage;
