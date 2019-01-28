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
import Modal from 'react-modal';
import swal from 'sweetalert';
import Navbar from '../Navbar';
import { getLoggedSingleOrder } from '../../actions/userActions';
import GoogleApiWrapper from '../googleMap/googleMap';
import '../../css/All-singleOrder.css';
import ChangeDestinationModal from '../modals/changeDestination';

TopBarProgress.config({
  barColors: {
    "0": "#B22222",
    "1.0": "#000000",
  },
  shadowBlur: 5,
});

class AdminSingleOrder extends Component {
  state = { modalDisplay: false , parcelId: '' };

  // eslint-disable-next-line consistent-return
  componentDidMount() {
    if (!localStorage.authToken) return this.props.history.push('/SignUp');
    // eslint-disable-next-line no-console
    const id = this.props.match.params.orderId;
    this.props.getLoggedSingleOrder(id);
  }

  showModal = (id) => {
    this.setState({ modalDisplay: true, parcelId: id  });
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
      <button id= "cancel_Order" onClick={this.showSwal}>Change Sta</button>
      <button id="change_Direction" onClick={this.showModal.bind(this, data.id)} > Change Destination</button>
    </div>) : '';

      map = <GoogleApiWrapper dataPassedToGoogleMaps = {dataPassedToGoogleMaps} />;

      changeDestinationModal = <ChangeDestinationModal modalDisplay = {this.state.modalDisplay} orderId ={this.state.parcelId}/>;

      finalContent = (
<table className ="single-order animated slideInLeft">
<tbody>
<tr></tr>
<tr>
<td><b>Item Name</b></td>
<td>{data.item_name}</td>
</tr>

<tr>
 <td><b>Status</b></td>
<td><span className={data.status}>{data.status}</span></td>
</tr>

<tr>
<td> <b>Destination</b></td>
<td>{data.destination_address}</td>
</tr>

<tr>
<td><b>Pickup Address</b></td>
<td>{data.pickup_address} </td>
</tr>

<tr>
<td><b>Current location</b></td>
<td> {data.currentlocation} </td>
</tr>
<tr>
<td><b>Receiver Name</b></td>
<td>{data.receiver_name} </td>
</tr>
<tr>
<td><b>Receiver Email</b></td>
<td>{data.receiver_email} </td>
</tr>
<tr>
<td><b>Item Weight</b></td>
<td>{data.item_weight} </td>
</tr>

</tbody>
</table>);
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
 
export default AdminSingleOrder;


const mapStateToProps = state => ({
  singleOrder: state.singleOrder,
  auth: state.auth,
});

export default connect(mapStateToProps, { getLoggedSingleOrder, cancelParcelOrder })(
  singleOrder,
);
