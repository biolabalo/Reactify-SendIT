/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import swal from "sweetalert";
import axios from "axios";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const loginUser = userData => dispatch => {
  axios
    .post("https://sendit-biola.herokuapp.com/api/v1/auth/login", userData)
    .then(result => {
      if (result.status === 200 && result.data.data[0].user.isadmin === false) {
        localStorage.setItem("authToken", result.data.data[0].token);
        // Set token to Auth header
        setAuthToken(result.data.data[0].token);
        // Decode token to get user data
        const decoded = jwt_decode(result.data.data[0].token);
        // Set current user
        return dispatch({ type: "SET_CURRENT_USER", payload: decoded });
      }
    })
    .catch(err => {
      if (!err.response) {
        swal({
          icon: "warning",
          title: err,
        });
        dispatch({
          type: "GET_ERRORS",
          payload: err,
        });
      } else {
        swal({
          icon: "warning",
          title: err.response.data.message,
        });
        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data.message,
        });
      }
    });
};
