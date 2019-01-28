/* eslint-disable no-tabs */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable quote-props */
/* eslint-disable quotes */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import '../../css/All-singleOrder.css';
import '../../css/body.css';
import '../../css/Animate.css';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import Navbar from '../Navbar';
import Modalo from '../modals/adminChangeDestination';
import { getAllUsersOrders, changeStatus } from '../../actions/userActions';

TopBarProgress.config({
  barColors: {
    '0': '#B22222',
    '1.0': '#000000',
  },
  shadowBlur: 5,
});

class AdminViewAllOrders extends Component {
  state = {
    modalDisplay: false,
    parcelId: '',
    allOrders: this.props.userOrders,
  };

  componentWillMount() {
    this.setState({ allOrders: this.props.userOrders });
  }

  showModal = (id) => {
    this.setState({ modalDisplay: true, parcelId: id });
  };

  changeStatus = (id) => {
    swal('Select the Status', {
      buttons: {
        Delivered: 'Delivered',
        InTransit: 'In Transit',
        Placed: 'Placed',
      },
    }).then((value) => {
      // eslint-disable-next-line no-empty
      switch (value) {
        case 'Delivered':
          this.props.changeStatus('Delivered', id);
          break;

        case 'InTransit':
          this.props.changeStatus('In Transit', id);
          break;

        case 'Placed':
          this.props.changeStatus('Placed', id);
          break;

        default:
          swal("You Didn't Select Any Options");
      }
    });
  };

  changeLocation = (id) => {};

  // eslint-disable-next-line consistent-return
  componentDidMount() {
    if (!localStorage.adminToken) {
      return this.props.history.push('/AdminSignIn');
    }
    this.props.getAllUsersOrders();
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
        userOrdersContent = userOrders.reverse().map((each, index) => (
          <tr key={index} className="table_row_style">
            <td>{each.item_name}</td>
            <td>{each.pickup_address}</td>
            <td>{each.destination_address}</td>
            <td className={each.status}>{each.status}</td>
            <td>{each.receiver_name}</td>
            <td>
              {each.status === 'Placed' || each.status === 'In Transit' ? (
                <button className="Admin-change-status-btn" id={each.id} onClick={this.changeStatus.bind(this, each.id)}>
                  Change Status
                </button>
              ) : (
                ''
              )}
            </td>

            <td>
              {each.status === 'Placed' || each.status === 'In Transit' ? (
                <button className="Admin-change-location-btn" id={each.id} onClick={this.showModal.bind(this, each.id)}>
                  Change Location
                </button>
              ) : (
                ''
              )}
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
              <p> 💪💪💪 💪 No User Has Created A parcel On this APP 💪💪💪💪</p>
            </div>
          </blockquote>
        );
      }
    }

    return (
      <div>
        {userOrders === null || loading ? <TopBarProgress /> : ''}
        <Navbar name="adminViewAllOrders" />
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
  { getAllUsersOrders, changeStatus },
)(AdminViewAllOrders);
