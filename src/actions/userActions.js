/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from "axios";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const getLoggedInUserOrders = () => async dispatch => {
  dispatch({
    type: "USER_ORDERS_LOADING",
  });
  const decoded = jwt_decode(localStorage.authToken);
  const { userId } = decoded;

  const url = `https://sendit-biola.herokuapp.com/api/v1/users/${userId}/parcels`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.authToken,
        "Content-type": "application/json",
      },
    });

    const result = await response.json();

    if (result) {
      dispatch({ type: "USER_ORDERS", payload: result });
    }
  } catch (e) {
    dispatch({ type: "USER_ORDERS", payload: {} });
  }
};
