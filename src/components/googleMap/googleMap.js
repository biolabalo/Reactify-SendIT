/* eslint-disable no-else-return */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Map, GoogleApiWrapper, InfoWindow, Marker,
} from 'google-maps-react';
import Spinner from 'react-spinkit';

const mapStyles = {
  margin: '0 auto',
  width: '70%',
  height: '70%',
};

export class MapContainer extends Component {
state = {
  destinatonDetails: '',
  currentLocationDetails: '',
};

// eslint-disable-next-line class-methods-use-this
// eslint-disable-next-line consistent-return
async componentWillMount() {
  const url_Destination_Add = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.dataPassedToGoogleMaps.destination_address}&key=AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg&amp`;
  const current_Location_Add = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.dataPassedToGoogleMaps.currentlocation}&key=AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg&amp`;
  const Array_Of_MapUrls = [url_Destination_Add, current_Location_Add];
  try {
    const data = await Promise.all(
      Array_Of_MapUrls.map(
        urls => fetch(urls).then(
          response => response.json(),
        ),
      ),
    );
    this.setState((state, props) => ({
      destinatonDetails: data[0].results[0].geometry.location, currentLocationDetails: data[1].results[0].geometry.location,
    }));
  } catch (error) {
    this.setState({ destinatonDetails: '', currentLocationDetails: '' });
  }
}

render() {
  if (this.state.destinatonDetails === '' && this.state.currentLocationDetails === '') {
    return (
      <Spinner name="double-bounce" />
    );
  } else {
    return (
    <React.Fragment>
      <h1>Parcel Destination</h1>
    <Map
      google={this.props.google}
      zoom={20}
      style={mapStyles}
      initialCenter={{
        lat: this.state.destinatonDetails.lat,
        lng: this.state.destinatonDetails.lng,
      }}/>
      </React.Fragment>);
  }
}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg',
})(MapContainer);
