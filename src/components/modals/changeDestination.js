/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
/* eslint-disable quote-props */
/* eslint-disable quotes */
import React, { Component } from 'react';
import Script from 'react-load-script';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TopBarProgress from 'react-topbar-progress-indicator';
import { editSingleOrder } from '../../actions/userActions';

TopBarProgress.config({
  barColors: {
    '0': '#B22222',
    '1.0': '#000000',
  },
  shadowBlur: 5,
});

class ChangeDestinationModal extends Component {
  state = {
    modalDisplay: this.props.modalDisplay,
    DestinationAdressEdit: '',
    loading: false,
  };

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line consistent-return
  componentWillReceiveProps(nextProps) {
    if (this.state.modalDisplay) {
      return this.setState({ modalDisplay: false, loading: false });
    }
    this.setState({ modalDisplay: nextProps.modalDisplay });
  }

  closeModal = () => {
    this.setState({ modalDisplay: false });
  };

  upDateContact = (e) => {
    e.preventDefault();
    if (!this.state.DestinationAdressEdit) return;
    const destinationAddress = this.state.DestinationAdressEdit;
    this.setState({ DestinationAdressEdit: '', loading: true });
    this.props.editSingleOrder(destinationAddress, this.props.orderId);
  };

  handleChangeDestinationAdress = e => this.setState({ DestinationAdressEdit: e.target.value });

  handleScriptLoadDestinationAdress = () => {
    this.dropdownDestinationAdress = new google.maps.places.Autocomplete(document.getElementById('DestinationAdressEdit'));
    this.dropdownDestinationAdress.addListener('place_changed', () => {
      const place1 = this.dropdownDestinationAdress.getPlace();
      this.setState({ DestinationAdressEdit: place1.formatted_address });
    });
  };

  render() {
    const { DestinationAdressEdit, isShowTopLoader, loading } = this.state;
    const display = this.state.modalDisplay ? 'block' : 'none';

    return (
      <React.Fragment>
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg&libraries=places" onLoad={this.handleScriptLoadDestinationAdress} />
        {}
        <div id="myModal" className="modal" style={{ display }}>
          {loading ? <TopBarProgress /> : ''}
          <div className="modal-content">
            <span className="close" onClick={this.closeModal}>
              &times;
            </span>
            <br />
            <form className="edit-destination-form" onSubmit={this.upDateContact}>
              <label>New Destination:</label>
              <input
                type="text"
                name="DestinationAdressEdit"
                id="DestinationAdressEdit"
                placeholder="Enter new  Destination"
                required
                autoComplete="off"
                onChange={this.handleChangeDestinationAdress}
                value={DestinationAdressEdit}
              />

              <br />
              <button className="sub-btn edit-dest">
                <span>Submit </span>
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  singleOrder: state.singleOrder,
});
export default connect(
  mapStateToProps,
  { editSingleOrder },
)(ChangeDestinationModal);
