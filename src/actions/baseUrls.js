const baseURL = 'https://sendit-biola.herokuapp.com/api/v1';


const urls = {
  authLogin: `${baseURL}/auth/login`,
  getLoggedInUserOrdersUrl: `${baseURL}/users/`,
  createParcelUrl: `${baseURL}/parcels/`,
  signUp: `${baseURL}/auth/signup`,
};

export default urls;
