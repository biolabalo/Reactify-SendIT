import {
  GET_All_USER_ORDERS, GET_CANCELED_USER_ORDERS,
  GET_CREATED_USER_ORDERS, GET_DELIVERED_USER_ORDERS,
  GET_INTRANSIT_USER_ORDERS, PARCEL_IS_LOADING, CREATE_NEW_PARCEL,
  SET_PAGES, GET_USER_PARCEL, ERROR, CHANGE_PARCEL_DESTINATION, CANCEL_PARCEL,
  CHANGE_PARCEL_LOCATION, CHANGE_PARCEL_STATUS
} from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/parcelReducer';

const parcel = {
  id: '1',
  parcelName: 'rice',
  weigth: '30',
  price: '4,000',
  destination: 'Owerri',
  receiver: 'Tiku Okoye',
  senton: '22-03-2019',
  status: 'created'
};

const error = 'Internal server error';

describe('parcel reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: '',
      isLoading: false,
      parcels: [],
      userParcel: {},
      deliveredParcels: [],
      inTransitParcels: [],
      createdParcels: [],
      canceledParcels: [],
      newParcel: [],
      changeDestination: '',
      changeLocation: '',
      pages: null,
      cancelParcel: '',
      changeStatus: ''
    });
  });
  it('should get all user orders', () => {
    const successAction = {
      type: GET_All_USER_ORDERS,
      payload: parcel,
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        parcels: parcel,
      });
  });
  it('should get delivered user orders', () => {
    const successAction = {
      type: GET_DELIVERED_USER_ORDERS,
      payload: parcel,
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        deliveredParcels: parcel,
      });
  });
  it('should get in-transit user orders', () => {
    const successAction = {
      type: GET_INTRANSIT_USER_ORDERS,
      payload: parcel,
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        inTransitParcels: parcel,
      });
  });
  it('should get created user orders', () => {
    const successAction = {
      type: GET_CREATED_USER_ORDERS,
      payload: parcel,
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        createdParcels: parcel,
      });
  });
  it('should get canceled user orders', () => {
    const successAction = {
      type: GET_CANCELED_USER_ORDERS,
      payload: parcel,
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        canceledParcels: parcel,
      });
  });
  it('should get a particular user\'s order', () => {
    const successAction = {
      type: GET_USER_PARCEL,
      payload: parcel,
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        userParcel: parcel,
      });
  });
  it('should create new orders', () => {
    const successAction = {
      type: CREATE_NEW_PARCEL,
      payload: parcel,
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        newParcel: parcel,
      });
  });
  it('should show that it\'s loading', () => {
    const loadingAction = {
      type: PARCEL_IS_LOADING,

    };
    expect(reducer({}, loadingAction))
      .toEqual({
        isLoading: true,
      });
  });
  it('should set the number of pages for pagination', () => {
    const paginationAction = {
      type: SET_PAGES,
      payload: 2
    };
    expect(reducer({}, paginationAction))
      .toEqual({
        pages: 2,
        isLoading: false
      });
  });
  it('should change error state', () => {
    const errorAction = {
      type: ERROR,
      payload: error,
    };
    expect(reducer({}, errorAction))
      .toEqual({
        isLoading: false,
        error,
      });
  });
  it('should change a parcel\'s destination', () => {
    const successAction = {
      type: CHANGE_PARCEL_DESTINATION,
      payload: 'Success',
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        changeDestination: 'Success'
      });
  });
  it('should cancel a parcel', () => {
    const successAction = {
      type: CANCEL_PARCEL,
      payload: 'Success',
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        cancelParcel: 'Success'
      });
  });
  it('should change a parcel\'s current location', () => {
    const successAction = {
      type: CHANGE_PARCEL_LOCATION,
      payload: 'Success',
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        changeLocation: 'Success'
      });
  });
  it('should change a parcel\'s status', () => {
    const successAction = {
      type: CHANGE_PARCEL_STATUS,
      payload: 'Success',
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: false,
        changeStatus: 'Success'
      });
  });
});
