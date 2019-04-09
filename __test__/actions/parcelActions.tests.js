import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  GET_DELIVERED_USER_ORDERS, GET_INTRANSIT_USER_ORDERS, GET_CANCELED_USER_ORDERS,
  GET_CREATED_USER_ORDERS, GET_All_USER_ORDERS, PARCEL_IS_LOADING,
  CREATE_NEW_PARCEL, ERROR, SET_PAGES, CHANGE_PARCEL_DESTINATION,
  CANCEL_PARCEL, CHANGE_PARCEL_LOCATION, CHANGE_PARCEL_STATUS
} from '../../src/actions/actionTypes';
import {
  getAllParcels, getUserParcels, createNewParcel, changeParcelDestination,
  cancelParcel, changeParcelLocation, changeParcelStatus
} from '../../src/actions/parcelActions';

const res = {
  data: [
    {
      id: 1,
      parcelName: 'rice',
      weigth: '30',
      price: '4,000',
      destination: 'Osun',
      receiver: 'Yemisis olaboder',
      senton: '22-03-2019',
      status: 'Delivered'
    },
    {
      id: 2,
      parcelName: 'rice',
      weigth: '30',
      price: '4,000',
      destination: 'Owerri',
      receiver: 'Tiku Okoye',
      senton: '22-03-2019',
      status: 'Created'
    },
    {
      id: 3,
      parcelName: 'rice',
      weigth: '30',
      price: '4,000',
      destination: 'Owerri',
      receiver: 'Balogun AKEEM ',
      senton: '22-03-2019',
      status: 'Canceled'
    },
    {
      id: 4,
      parcelName: 'rice',
      weigth: '30',
      price: '4,000',
      destination: 'Owerri',
      receiver: 'Tiku Okoye',
      senton: '22-03-2019',
      status: 'In-transit'
    }
  ],
  pages: 2
};

const errorRes = {
  Response: {
    status: 404,
    ok: false,
    statusText: 'Not Found',
    redirected: false,
    type: 'cors',
    message: 'Internal server error'
  }
};


describe('Get user\'s parcel', () => {
  const parcels = Object.values(res.data),
    deliveredParcels = parcels.filter(parcel => parcel.status === 'Delivered'),
    inTransitParcels = parcels.filter(parcel => parcel.status === 'In-transit'),
    createdParcels = parcels.filter(parcel => parcel.status === 'Created'),
    canceledParcels = parcels.filter(parcel => parcel.status === 'Canceled');

  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify(res));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: GET_DELIVERED_USER_ORDERS, payload: deliveredParcels },
      { type: GET_INTRANSIT_USER_ORDERS, payload: inTransitParcels },
      { type: GET_CREATED_USER_ORDERS, payload: createdParcels },
      { type: GET_CANCELED_USER_ORDERS, payload: canceledParcels },
      { type: GET_All_USER_ORDERS, payload: parcels },
      { type: SET_PAGES, payload: res.pages }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      parcels: [],
      deliveredParcels: [],
      inTransitParcels: [],
      createdParcels: [],
      canceledParcels: [],
      newParcel: []
    }, expectedActions, done);

    store.dispatch(getUserParcels(res))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: ERROR, payload: errorRes.message }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      parcels: [],
      deliveredParcels: [],
      inTransitParcels: [],
      createdParcels: [],
      canceledParcels: [],
      newParcel: [],
      error: ''
    }, expectedActions, done);
    store.dispatch(getUserParcels(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

describe('Get all parcels', () => {
  const parcels = Object.values(res.data),
    deliveredParcels = parcels.filter(parcel => parcel.status === 'Delivered'),
    inTransitParcels = parcels.filter(parcel => parcel.status === 'In-transit'),
    createdParcels = parcels.filter(parcel => parcel.status === 'Created'),
    canceledParcels = parcels.filter(parcel => parcel.status === 'Canceled');

  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify(res));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: GET_DELIVERED_USER_ORDERS, payload: deliveredParcels },
      { type: GET_INTRANSIT_USER_ORDERS, payload: inTransitParcels },
      { type: GET_CREATED_USER_ORDERS, payload: createdParcels },
      { type: GET_CANCELED_USER_ORDERS, payload: canceledParcels },
      { type: GET_All_USER_ORDERS, payload: parcels },
      { type: SET_PAGES, payload: res.pages }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      parcels: [],
      deliveredParcels: [],
      inTransitParcels: [],
      createdParcels: [],
      canceledParcels: [],
      newParcel: []
    }, expectedActions, done);

    store.dispatch(getAllParcels(res))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: ERROR, payload: errorRes.message }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      parcels: [],
      deliveredParcels: [],
      inTransitParcels: [],
      createdParcels: [],
      canceledParcels: [],
      newParcel: []
    }, expectedActions, done);
    store.dispatch(getAllParcels(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

describe('Change Parcel destination', () => {
  const desRes = 'Success';
  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify(desRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: CHANGE_PARCEL_DESTINATION, payload: desRes },
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      changeDestination: '',
      error: ''
    }, expectedActions, done);

    store.dispatch(changeParcelDestination(desRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: ERROR, payload: errorRes.message }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      changeDestination: '',
      error: ''
    }, expectedActions, done);
    store.dispatch(changeParcelDestination(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

describe('Change Parcel location', () => {
  const desRes = 'Success';
  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify(desRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: CHANGE_PARCEL_LOCATION, payload: desRes },
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      changeLocation: '',
      error: ''
    }, expectedActions, done);

    store.dispatch(changeParcelLocation(desRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: ERROR, payload: errorRes.message }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      changeLocation: '',
      error: ''
    }, expectedActions, done);
    store.dispatch(changeParcelLocation(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

describe('Change Parcel status', () => {
  const desRes = 'Success';
  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify(desRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: CHANGE_PARCEL_STATUS, payload: desRes },
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      changeStatus: '',
      error: ''
    }, expectedActions, done);

    store.dispatch(changeParcelStatus(desRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: ERROR, payload: errorRes.message }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      changeStatus: '',
      error: ''
    }, expectedActions, done);
    store.dispatch(changeParcelStatus(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

describe('Cancel Parcel', () => {
  const desRes = 'Success';
  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify(desRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: CANCEL_PARCEL, payload: desRes },
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      canceledParcel: '',
      error: ''
    }, expectedActions, done);

    store.dispatch(cancelParcel(desRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: ERROR, payload: errorRes.message }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      canceledParcel: '',
      error: ''
    }, expectedActions, done);
    store.dispatch(cancelParcel(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

describe('Create a new parcel', () => {
  const parcelRes = {
    rows: {
      id: 1,
      parcelName: 'rice',
      weigth: '30',
      price: '4,000',
      destination: 'Owerri',
      receiver: 'Tiku Okoye',
      senton: '22-03-2019',
      status: 'Delivered'
    },
  };

  const parcel = parcelRes.rows;

  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify(parcelRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: CREATE_NEW_PARCEL, payload: parcel },
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      parcels: [],
      deliveredParcels: [],
      inTransitParcels: [],
      createdParcels: [],
      canceledParcels: [],
      newParcel: []
    }, expectedActions, done);

    store.dispatch(createNewParcel(res))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(new Error(errorRes));

    const expectedActions = [
      { type: PARCEL_IS_LOADING },
      { type: ERROR, payload: errorRes.message }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      isLoading: false,
      parcels: [],
      deliveredParcels: [],
      inTransitParcels: [],
      createdParcels: [],
      canceledParcels: [],
      newParcel: []
    }, expectedActions, done);
    store.dispatch(createNewParcel(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});