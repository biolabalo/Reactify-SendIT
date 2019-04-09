/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import HomePage from './components/HomePage';
import NotFoundPage from './components/404';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AdminSignIn from './components/auth/AdminSignIn';
import userViewAllOrders from './components/userViewAllOrders';
import SingleOrder from './components/singleOrder';
import createOrder from './components/createOrder';
import AdminViewAllOrders from './components/Admin/adminViewAll';
import store from './store';


// Check for token
if (localStorage.authToken) {
  // Set auth token header auth
  setAuthToken(localStorage.authToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.authToken);
  // Set user and isAuthenticated
  store.dispatch({
    type: 'SET_CURRENT_USER',
    payload: decoded,
  });
}
if (localStorage.adminToken) {
  // Set auth token header auth
  setAuthToken(localStorage.adminToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.adminToken);
  // Set user and isAuthenticated
  store.dispatch({
    type: 'SET_CURRENT_USER',
    payload: decoded,
  });
}

class App extends Component {
  render() {
    return (
    <Provider store={store}>
     <Router>
    <Switch>
      <Route exact path = '/' component={HomePage} />
      <Route exact path = '/SignIn' component={SignIn} />
      <Route exact path = '/SignUp' component={SignUp} />
      <Route exact path = '/AdminSignIn' component={AdminSignIn} />
      <Route exact path = '/createOrder' component={createOrder}/>
      <Route exact path = '/userViewAllOrders' component={userViewAllOrders} />
      <Route exact path = '/adminViewAllOrders' component={AdminViewAllOrders} />
      <Route exact path = '/SingleStore/:orderId' component={SingleOrder} />
      <Route component={NotFoundPage} />
   </Switch>
    </Router>
    </Provider>
    );
  }
}
export default App;
