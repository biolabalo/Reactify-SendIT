/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import SiginForm from './SignInform';
// import '../App.css';
import '../../css/Animate.css';
import '../../css/style.css';

class SignIn extends Component {
  render() {
    return (
        <React.Fragment>
         <main className="animated jello">
          <div className ="sendIt-desc">
            <h1> Send IT </h1>
            <p> SendIT is a courier service that helps users deliver parcels to different destinations. </p>
          </div>
         </main>
        <section className="animated jello">
        <SiginForm/>
        </section>
        </React.Fragment>

    );
  }
}

export default SignIn;
