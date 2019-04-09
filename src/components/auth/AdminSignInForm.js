/* eslint-disable no-unused-vars */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import Spinner from 'react-spinkit';
import propTypes from 'prop-types';
import TopBarProgress from 'react-topbar-progress-indicator';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { validateInputs } from '../../Validation/validateInputs';
import validateLoginB4Submission from '../../Validation/login';
import { loginUser } from '../../actions/authActions';

TopBarProgress.config({
  barColors: {
    "0": "#B22222",
    "1.0": "#000000",
  },
  shadowBlur: 5,
});

class AdminSignInForm extends Component {
state = {
  email: '',
  password: '',
  isShowEmailError: false,
  isShowPasswordError: false,
  loading: false,
  isShowSpinnerFly: false,
};

componentDidMount() {
  if (this.props.auth.isAuthenticated) {
    this.props.history.push('/adminViewAllOrders');
  }
}

componentWillReceiveProps(nextProps) {
  if (nextProps.auth.isAuthenticated) {
    this.props.history.push('/adminViewAllOrders');
  }
  if (nextProps.errors) {
    this.setState({
      loading: false, isShowSpinnerFly: false, isShowEmailError: false, isShowPasswordError: false,
    });
  }
}

validate = (e) => {
  const result = validateInputs(e.target.name, e.target.value);
  if (!result[1]) this.setState({ [result[0]]: true });
  if (result[1]) this.setState({ [result[0]]: false });
}

ShowSpinner = () => this.setState({ isShowSpinnerFly: true, loading: true });

handleChange = e => this.setState({ [e.target.name]: e.target.value });

// eslint-disable-next-line consistent-return
handleSubmit = (e) => {
  e.preventDefault();
  const adminData = this.state;
  const result = validateLoginB4Submission(adminData);
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
    isShowEmailError: false,
    isShowPasswordError: false,
  });
  this.props.loginUser(adminData);
};

render() {
  const {
    email,
    password,
    isShowEmailError,
    isShowPasswordError,
    loading,
    isShowSpinnerFly,
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
       {isShowSpinnerFly ? <TopBarProgress /> : '' }
    <form className="sign-In" method="post"onSubmit={this.handleSubmit}>
    <div className = "space">

    <h1> ADMIN LOGIN </h1>
    </div>
    <br/>
    <label>Email:</label>
    <br/>

  <input type="email"
         name="signupEmail"
         className="Email"
         placeholder= "Enter Your Email"
         required autoComplete="off"
         name = 'email'
         onChange = {this.handleChange}
         onBlur = {this.validate}
         value = {email} />
   <br/>
   { isShowEmailError ? (<small className="invalid-feedback-show i-f"> Email is Not Valid </small>)
     : null }

   <label>Password:</label><br/>

   <input type="password"
         id="signupPassword"
         name="password"
         className="password"
         type= "password"
         placeholder="Enter Your Password"
         required
         autoComplete="off"
         name = 'password'
         autoComplete="new-password"
         onBlur = {this.validate}
         onChange = {this.handleChange}
         value = {password} />

<br/>
   { isShowPasswordError ? (<small className="invalid-feedback-show i-f"> password must be at least 5 characters </small>)
     : null }
<br/>

 <button className="sub-btn"><span>{spinner}Submit</span></button>
 <br/>
 <br/>
  <small><Link to ='/'>   <span> Home &#8594;</span>  </Link></small>
 </form>
 </React.Fragment>
  );
}
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(AdminSignInForm));
