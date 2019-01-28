/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import SignUpForm from './SignUpform';
import '../../css/Animate.css';
import '../../css/style.css';

const SignUp = () => (
        <React.Fragment>
         <main className="animated jello">
          <div className ="sendIt-desc">
            <h1> Send IT </h1>
            <p> SendIT is a courier service that helps users deliver parcels to different destinations. </p>
          </div>
         </main>
        <section className="animated jello">
        <SignUpForm/>
        </section>
        </React.Fragment>

    );
export default SignUp;
