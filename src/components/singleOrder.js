/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable quote-props */
/* eslint-disable quotes */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import TopBarProgress from 'react-topbar-progress-indicator';
import swal from 'sweetalert';
import Navbar from './Navbar';
import { getLoggedSingleOrder, cancelParcelOrder } from '../actions/userActions';
import GoogleApiWrapper from './googleMap/googleMap';
import '../css/All-singleOrder.css';
import ChangeDestinationModal from './modals/changeDestination';
import finalCon from './Admin/finalContent';

TopBarProgress.config({
  barColors: {
    "0": "#B22222",
    "1.0": "#000000",
  },
  shadowBlur: 5,
});

class singleOrder extends Component {
    state = { modalDisplay: false };

    // eslint-disable-next-line consistent-return
    componentDidMount() {
      if (!localStorage.authToken) return this.props.history.push('/SignUp');
      // eslint-disable-next-line no-console
      const id = this.props.match.params.orderId;
      this.props.getLoggedSingleOrder(id);
    }

    showModal = () => {
      this.setState({ modalDisplay: true });
    }

    showSwal = () => {
      swal('Are you sure You want to cancel this  Parcel Order?', {
        icon: 'warning',
        dangerMode: true,
        buttons: ["Do not Cancel", "Cancel Parcel  Order"],
      }).then((result) => {
        if (result) {
          this.props.cancelParcelOrder(this.props.match.params.orderId);
        }
      });
    }

    render() {
      // eslint-disable-next-line no-console
      const id = this.props.match.params.orderId;
      let buttonActions;
      let finalContent;
      let changeDestinationModal;
      let map;
      const { singleOrder: data, loading } = this.props.singleOrder;
      if (data === null || loading) {

        finalContent = <Spinner name="line-scale" />;

      } else if (data !== null && !loading) {

        const dataPassedToGoogleMaps = data;
        buttonActions = (data.status === 'Placed' || data.status === 'In Transit') ? (<div className="cancel-change-destination">
        <button id= "cancel_Order" onClick={this.showSwal}>Cancel Order</button>
        <button id="change_Direction" onClick={this.showModal.bind(this)} > Change Destination</button>
      </div>) : '';

        map = <GoogleApiWrapper dataPassedToGoogleMaps = {dataPassedToGoogleMaps} />;
        changeDestinationModal = <ChangeDestinationModal modalDisplay = {this.state.modalDisplay} orderId ={id}/>;
        finalContent = finalCon(data);
      }
      
      return (
<React.Fragment>
<Navbar name ='singleOrder'/>
{ data === null || loading ? <TopBarProgress /> : '' }
<div className="all-orders-container">
<blockquote>
{finalContent}
<br/>
{buttonActions}
<br/>
<br/>
{map}
{changeDestinationModal}
</blockquote>
</div>
</React.Fragment>
      );
    }
}


const mapStateToProps = state => ({
  singleOrder: state.singleOrder,
  auth: state.auth,
});

export default connect(mapStateToProps, { getLoggedSingleOrder, cancelParcelOrder })(
  singleOrder,
);
