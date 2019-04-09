/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import urls from './baseUrls';


const { getLoggedInUserOrdersUrl, createParcelUrl } = urls;

export const getLoggedInUserOrders = () => async (dispatch) => {
  dispatch({
    type: 'USER_ORDERS_LOADING',
  });
  const decoded = jwt_decode(localStorage.authToken);
  const { userId } = decoded;

  try {
    const response = await fetch(`${getLoggedInUserOrdersUrl}${userId}/parcels`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.authToken,
        'Content-type': 'application/json',
      },
    });

    const result = await response.json();

    if (result) {
      dispatch({ type: 'USER_ORDERS', payload: result });
    }
  } catch (e) {
    dispatch({ type: 'USER_ORDERS', payload: {} });
  }
};

export const createParcelOrder = (createOrderData, history) => async (dispatch) => {
  const url = createParcelUrl;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(createOrderData),
      headers: {
        'x-access-token': localStorage.authToken,
        'Content-type': 'application/json',
      },
    });

    const result = await response.json();
    if (result.error) throw result.error;
    history.push('/userViewAllOrders');
  } catch (err) {
    swal({
      icon: 'warning',
      title: err,
    });
    dispatch({
      type: 'GET_ERRORS',
      payload: err,
    });
  }
};

export const getLoggedSingleOrder = clickedSingleParcel => async (dispatch) => {
  dispatch({
    type: 'SINGLE_ORDER_LOADING',
  });

  try {
    const response = await fetch(`${createParcelUrl}${clickedSingleParcel}`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.authToken,
        'Content-type': 'application/json',
      },
    });
    const result = await response.json();
    if (result.success) {
      const { orders } = result;
      dispatch({ type: 'SINGLE_ORDER', payload: orders });
    }
  } catch (e) {
    dispatch({ type: 'SINGLE_ORDER', payload: null });
  }
};

export const editSingleOrder = (newDestination, SingleParcel) => (dispatch) => {
  const url = `https://sendit-biola.herokuapp.com/api/v1/parcels/${SingleParcel}/destination`;

  fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      destinationAddress: newDestination,
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'x-access-token': localStorage.authToken,
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())
    // eslint-disable-next-line no-console
    .then((result) => {
      dispatch({ type: 'SINGLE_ORDER', payload: result.orders });
    })
    .catch((err) => {
      swal({ icon: 'warning', title: err });
    });
};

export const cancelParcelOrder = id => (dispatch) => {
  const endPointToCancel = `${createParcelUrl}${id}/cancel`;
  fetch(endPointToCancel, {
    method: 'PUT',
    headers: {
      'x-access-token': localStorage.authToken,
    },
  })
    .then(res => res.json())
    .then((result) => {
      dispatch({ type: 'SINGLE_ORDER', payload: result.orders });
    })
    .catch((err) => {
      swal({ icon: 'warning', title: err });
    });
};

// ADMIN STUFFS
export const changeStatus = (parcelStatus, id) => async (dispatch) => {
  const url = `${createParcelUrl}${id}/status`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        status: parcelStatus,
      }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'x-access-token': localStorage.adminToken,
        'Content-type': 'application/json',
      },
    });
    const result = await response.json();
    if (result && result.status === parcelStatus) {
      dispatch({ type: 'CHANGE_ORDER_STATUS', payload: result });
      swal('Good job!', 'Succesfully Updated!', 'success');
    }
  } catch (err) {
    swal('Error!', 'Failed To Update!', 'error');
  }
};

// ADMIN STUFFS
export const getAllUsersOrders = () => async (dispatch) => {
  dispatch({
    type: 'USER_ORDERS_LOADING',
  });

  const url = createParcelUrl;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.adminToken,
        'Content-type': 'application/json',
      },
    });

    const result = await response.json();
    if (result && result.status === 200) dispatch({ type: 'USER_ORDERS', payload: result.data });
  } catch (e) {
    swal({
      icon: 'warning',
      title: 'Error in Fetching Data',
    });
  }
};
