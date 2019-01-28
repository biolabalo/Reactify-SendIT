/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { css } from '@emotion/core';
import Spinner from 'react-spinkit';
import Script from 'react-load-script';
import { ClipLoader } from 'react-spinners';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import '../css/createOrder.css';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { createParcelOrder } from '../actions/userActions';

class CreateOrder extends Component {
state = {
  itemName: '',
  pickUpAddress: '',
  destinationAddress: '',
  receiverName: '',
  receiverEmail: '',
  itemWeight: '',
  loading: false,
};

// My Auth Gaurd
// eslint-disable-next-line consistent-return
componentDidMount() {
  if (!localStorage.authToken) return this.props.history.push('/SignUp');
}

handleSubmit = (e) => {
  e.preventDefault();

  const createOrderData = {
    itemName: this.state.itemName,
    pickUpAddress: this.state.pickUpAddress,
    destinationAddress: this.state.destinationAddress,
    receiverName: this.state.receiverName,
    receiverEmail: this.state.receiverEmail,
    itemWeight: Number(this.state.itemWeight),
  };

  this.setState({
    loading: true,
    itemName: '',
    pickUpAddress: '',
    destinationAddress: '',
    receiverName: '',
    receiverEmail: '',
    itemWeight: '',
  });
  this.props.createParcelOrder(createOrderData, this.props.history);
}

handleChange = e => this.setState({ [e.target.name]: e.target.value });

handleChangepickUpAddress = e => this.setState({ pickUpAddress: e.target.value });

handleChangeDestinationAdress = e => this.setState({ destinationAddress: e.target.value });

handleMultipleScriptLoad = () => {
  this.handleScriptLoadpickUpAddress();
  this.handleScriptLoadDestinationAdress();
}

handleScriptLoadpickUpAddress =() => {
  this.dropdownpickUpAddress = new google.maps.places.Autocomplete(
    document.getElementById('pickUpAddress'),
  );
  this.dropdownpickUpAddress.addListener('place_changed', () => {
    const place2 = this.dropdownpickUpAddress.getPlace();
    this.setState({ pickUpAddress: place2.formatted_address });
  });
}

handleScriptLoadDestinationAdress =() => {
  this.dropdownDestinationAdress = new google.maps.places.Autocomplete(
    document.getElementById('DestinationAdress'),
  );
  this.dropdownDestinationAdress.addListener('place_changed', () => {
    const place1 = this.dropdownDestinationAdress.getPlace();
    this.setState({ destinationAddress: place1.formatted_address });
  });
}

componentWillReceiveProps(nextProps) {
  if (nextProps.errors) {
    this.setState({
      loading: false,
    });
  }
}

render() {
  const {
    itemName,
    pickUpAddress,
    destinationAddress,
    receiverName,
    receiverEmail,
    itemWeight,
    loading,
  } = this.state;

  const override = css`
  display: block;
  margin: 0 auto;
  margin-right:10px;
  border-color: red;
`;
  const bubbles = <Spinner name="double-bounce" />;
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
  <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg&libraries=places"
          onLoad={this.handleMultipleScriptLoad}
        />
<Navbar name = 'createOrderPage'/>
<div className = 'aside_main'>
<form id="create-parcel" className="animated flipInY" onSubmit={this.handleSubmit}>

<div className = "form-container">
<div className ="h1Spinner">
  {loading ? bubbles : ''} <h1> CREATE PARCEL ORDER </h1> {loading ? bubbles : ''}
  </div>
  <br/>
  <br/>
<label>Name Of Item:(At Least 3 characters)</label>
<br/>
 <input type="text"
 name ="itemName"
 id="Item-name"
 placeholder="Enter the Name of the Item"
 required autoComplete="off"
 onChange = {this.handleChange}
 onBlur = {this.validate}
 value = {itemName}/>
 <br/> <br/>

<label>Pick Up Location:</label>
<br/>
  <input type="text"
   name = "pickUpAddress"
    id="pickUpAddress"
    placeholder="Enter Pick Up Location"
    required autoComplete="off"
    onChange = {this.handleChangepickUpAddress}
    onBlur = {this.validate}
    value = {pickUpAddress}/>

<br/>
<label>Destination Address:</label>
<br/>
 <input type="text"
  name ="destinationAddress"
  id="DestinationAdress"
  placeholder="Enter Destination Location"
   required autoComplete="off"
   onChange = {this.handleChangeDestinationAdress}
   onBlur = {this.validate}
   value = {destinationAddress}/>
   <br/>


<br/>
<label>Name Of Recepient:</label>
<br/>
 <input type="text"
 name = "receiverName"
 id="receiverName"
  placeholder="Enter the Name of Recepient"
  required autoComplete="off"
  onChange = {this.handleChange}
  onBlur = {this.validate}
  value = {receiverName}/>
  <br/><br/>

<label>Email Of Recepient:</label>

 <input type="email"
 name ="receiverEmail"
 id="receiverEmail"
 placeholder="Enter the Email of Recepient"
 required autoComplete="off"
 onChange = {this.handleChange}
 onBlur = {this.validate}
 value = {receiverEmail}/><br/>
<br/>

<label>Item Weight:kg</label>

 <input type="number"
 name ="itemWeight"
 id="itemWeight"
 placeholder="Enter the weight of Item"
 required autoComplete="off"
 onChange = {this.handleChange}
 onBlur = {this.validate}
 value = {itemWeight}/><br/>

 <br/>
 <button className="sub-btn"><span>{spinner}Submit</span></button>
</div>
</form>
</div>
    </React.Fragment>
  );
}
}

const mapStateToProps = state => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { createParcelOrder })(
  withRouter(CreateOrder),
);
