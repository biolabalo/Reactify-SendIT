/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

class Navbar extends Component {
  onLogoutClick(userType) {
    this.props.history.push('/');
    this.props.logoutUser(userType);
  }


  render() {
    const { isAuthenticated, user } = this.props.auth;
    const isAmdinLoggedIn = this.props.auth.user.isAdmin;
    const guestLinks = (
        <nav>
        <h2>Main Navigation</h2>
        <div id="burger-nav"></div>
        <ul>
            <li><Link to='/SignIn'>Sign In </Link></li>
            <li><Link to='/SignUp'>Sign Up</Link></li>
        </ul>
    </nav>
    );
    const LoggedIn = (
        <nav>
        <h2>Main Navigation</h2>
        <div id="burger-nav"></div>
        <ul>
        { this.props.name === 'userViewAllOrders' ? <li><Link to='/createOrder'> Create Order </Link></li> : '' }
    { this.props.name === 'createOrderPage' ? <li><Link to='/userViewAllOrders'> View All Orders </Link></li> : '' }
    { this.props.name === 'singleOrder' ? <li><Link to='/userViewAllOrders'> View All Orders </Link></li> : '' }
            {this.props.name === 'LoggedInSingleParcelNavBar' ? <li><Link to='/userViewAllOrders'> View All Orders </Link></li> : '' }
            <li onClick={this.onLogoutClick.bind(this, 'authToken')}> <a> Logout</a> </li>
        </ul>
    </nav>
    );
    // return starts here
    if (isAuthenticated && isAmdinLoggedIn) {
      return (
            <React.Fragment>
            <header>
            <div className="wrapper">
                <Link to='/' ><h1 className="logo">Send It</h1> </Link>
                <nav>
        <h2>Main Navigation</h2>
        <div id="burger-nav"></div>
        <ul>
        <li onClick={this.onLogoutClick.bind(this, 'adminToken')}> <a> Logout</a> </li>
        </ul>
    </nav>
            </div>
        </header>
            </React.Fragment>
      );
    } if (isAuthenticated && !isAmdinLoggedIn) {
      return (
            <React.Fragment>
            <header>
            <div className="wrapper">
                <Link to='/' ><h1 className="logo">Send It</h1> </Link>
                {isAuthenticated ? LoggedIn : guestLinks}
            </div>
        </header>
            </React.Fragment>
      );
    } if (!isAuthenticated) {
      // eslint-disable-next-line no-unused-expressions
      return (
        <React.Fragment>
        <header>
        <div className="wrapper">
            <Link to='/' ><h1 className="logo">Send It</h1> </Link>
            <nav>
            <h2>Main Navigation</h2>
            <div id="burger-nav"></div>
            <ul>
                <li><Link to='/SignIn'>Sign In </Link></li>
                <li><Link to='/SignUp'>Sign Up</Link></li>
            </ul>
        </nav>
        </div>
    </header>
        </React.Fragment>
      );
    // eslint-disable-next-line no-else-return
    } else {
      return (null);
    }
    // return ends here
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
