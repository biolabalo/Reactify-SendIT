/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable quote-props */
/* eslint-disable quotes */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import '../css/All-singleOrder.css';
import '../css/body.css';
import '../css/Animate.css';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import Navbar from './Navbar';
import { getLoggedInUserOrders } from '../actions/userActions';

TopBarProgress.config({
  barColors: {
    '0': '#B22222',
    '1.0': '#000000',
  },
  shadowBlur: 5,
});

class userViewAllOrders extends Component {
  // eslint-disable-next-line consistent-return
  componentDidMount() {
    if (!localStorage.authToken) {
      localStorage.clear();
      this.props.history.push('/SignUp');
      return;
    }
    this.props.getLoggedInUserOrders();
  }

  render() {
    let final_content = '';
    const { isAuthenticated, user } = this.props.auth;
    const { userOrders, loading } = this.props.userOrders;
    let userOrdersContent;
    if (userOrders === null || loading) {
      final_content = <Spinner name="line-scale" color="steelblue" />;
    } else if (userOrders !== null || !loading) {
      // eslint-disable-next-line no-lonely-if
      if (userOrders.length > 0) {
        userOrdersContent = userOrders.map((each, index) => (
          <tr key={index} className="table_row_style">
            <td>{each.item_name}</td>
            <td>{each.pickup_address}</td>
            <td>{each.destination_address}</td>
            <td className={each.status}>{each.status}</td>
            <td>{each.receiver_name}</td>
            <td>
              {' '}
              <Link to={`/SingleStore/${each.id}`} className="view-btn">
                {' '}
                View{' '}
              </Link>
            </td>
          </tr>
        ));

        final_content = (
          <blockquote>
            <h1 className="allOrders">ALL ORDERS </h1>
            <table className="animated zoomInDown">
              <tbody>
                <tr>
                  <th>Item Name</th>
                  <th>Pick Up Address</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Recepient </th>
                  <th />
                </tr>
                {userOrdersContent}
              </tbody>
            </table>
          </blockquote>
        );
      } else {
        // User is logged in but has no Orders
        final_content = (
          <blockquote>
            <div>
              <p> 💪💪💪 💪 You have Do not Have any Orders Yet 💪💪💪💪</p>
            </div>
          </blockquote>
        );
      }
    }

    return (
      <div>
        {userOrders === null || loading ? <TopBarProgress /> : ''}
        <Navbar name="userViewAllOrders" />
        <div className="all-orders-container">{final_content}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userOrders: state.userOrders,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getLoggedInUserOrders },
)(userViewAllOrders);
