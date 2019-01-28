/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { validateInputs } from '../../../Validation/validateInputs';
import validateBeforeSubmission from '../../../Validation/validateB4Submission';


class SignUpForm extends Component {
state = {
  email: '',
  password: '',
  fullname: '',
  confirmpassword: '',
  isShowFullnameError: false,
  isShowEmailError: false,
  isShowPasswordError: false,
  isConfirmPasswordNotEqualPassword: false,
  loading: false,
};

// eslint-disable-next-line class-methods-use-this
componentDidMount() {
  if (localStorage.authToken) {
    this.props.history.push('/userViewAllOrders');
  }
}

ShowSpinner = () => this.setState({ loading: true })

handleChange = e => this.setState({ [e.target.name]: e.target.value });

validate = (e) => {
  const result = validateInputs(e.target.name, e.target.value);
  if (!result[1]) this.setState({ [result[0]]: true });
  if (result[1]) this.setState({ [result[0]]: false });
}

// eslint-disable-next-line consistent-return
handleSubmit = async (e) => {
  e.preventDefault();
  const userInput = this.state;
  const result = validateBeforeSubmission(userInput);
  if (!result) {
    return swal({
      icon: 'warning',
      title: 'Inputs Must be Valid Before Submission',
    });
  }
  this.ShowSpinner();
  // Clear State
  this.setState({
    email: '',
    password: '',
    fullname: '',
    confirmpassword: '',
    isShowFullnameError: false,
    isShowEmailError: false,
    isShowPasswordError: false,
    isConfirmPasswordNotEqualPassword: false,
  });
  try {
    const data = {
      fullname: userInput.fullname,
      password: userInput.password,
      email: userInput.email,
      confirmPassword: userInput.confirmpassword,
    };
    const response = await fetch('https://sendit-biola.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.message === 'User with that EMAIL already exist') {
      return swal({ icon: 'warning', title: 'User with that EMAIL already exist' });
    }
    if (res.status === 201) {
      swal({ icon: 'success', title: 'Successfully signed Up' });
      this.props.history.push('/SignIn');
    } else {
      // eslint-disable-next-line consistent-return
      this.setState({ loading: false });
      return swal({ icon: 'warning', title: 'Sign Up Failed Try Again' });
    }
  } catch (err) {
    swal({ icon: 'warning', title: 'Network Error' });
    this.setState({
      email: '',
      password: '',
      fullname: '',
      confirmpassword: '',
      isShowFullnameError: false,
      isShowEmailError: false,
      isShowPasswordError: false,
      isConfirmPasswordNotEqualPassword: false,
      loading: false,
    });
  }
}

render() {
  const {
    email,
    password,
    fullname,
    confirmpassword,
    isShowFullnameError,
    isShowEmailError,
    isShowPasswordError,
    isConfirmPasswordNotEqualPassword,
    loading,
  } = this.state;

  const override = css`
    display: block;
    margin: 0 auto;
    margin-right:10px;
    border-color: red;
`;
  const spinner = (<span className='sweet-loading'>
<ClipLoader
  css={override}
  sizeUnit={'px'}
  size={10}
  color={'white'}
  loading={loading}
/>
</span>);
  return (
    <React.Fragment>
    <form className="sign-up" onSubmit={this.handleSubmit}>
    <div className = "space">

     <h1> SIGN UP </h1>
    </div>

    <br/><label>Fullname:</label><br/>

 <input id="fullname"
       name="fullname"
       className="fullname"
       placeholder="Enter Your Fullname"
       required
       autoComplete="off"
       name = 'fullname'
       onBlur = {this.validate}
       onChange = {this.handleChange}
       value = {fullname} />

    <br/>

{ isShowFullnameError ? (<small className="invalid-feedback-show i-f"> Fullname must above 5 characters </small>)
  : null }
      <br/>
    <label>Email:</label>
    <br/>

  <input type="email"
         name="signupEmail"
         className="Email"
         placeholder= "Enter Your Email"
         required autoComplete="off"
         name = 'email'
         onBlur = {this.validate}
         onChange = {this.handleChange}
         value = {email} />


   <br/>
   { isShowEmailError ? (<small className="invalid-feedback-show i-f"> Email is Not Valid </small>)
     : null }
  <br/>
   <label>Password:</label><br/>

   <input type="password"
         id="signupPassword"
         name="password"
         className="password"
         type= "password"
         placeholder="Enter Your Password"
         required
         autoComplete="new-password"
         name = 'password'
         onBlur = {this.validate}
         onChange = {this.handleChange}
         value = {password} />

<br/>
   { isShowPasswordError ? (<small className="invalid-feedback-show i-f"> password must be at least 5 characters </small>)
     : null }
<br/>

<br/><label>Confirm Password:</label><br/>
<input type="password"
         id="confirmPassword"
         name="confirmpassword"
         className="password"
         type= "password"
         placeholder="Confirm Password"
         required
         autoComplete="off"
         onBlur = {this.validate}
         onChange = {this.handleChange}
         value = {confirmpassword} />

<br/>
   { isConfirmPasswordNotEqualPassword ? (<small className="invalid-feedback-show i-f"> password and confirm password do not match </small>)
     : null }
<br/>
    <br/>
  <button type="submit" className="sub-btn"> {spinner}Submit </button>
  <p>Sign In as <Link to ='/AdminSignIn'>Admin </Link></p>
  <p>Already Created An Account  <Link to ='/SignIn'>Sign In </Link></p>
  <small><Link to ='/'>   <span> Home &#8594;</span>  </Link></small>
 </form>
 </React.Fragment>
  );
}
}

export default withRouter(SignUpForm);
