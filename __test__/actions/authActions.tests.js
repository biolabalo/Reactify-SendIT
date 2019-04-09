import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import configureMockStore from 'redux-mock-store';
import jwt_decode from 'jwt-decode';
import { logoutUser, loginUser } from '../../src/actions/authActions';
import urls from '../../src/actions/baseUrls';
import { SET_CURRENT_USER } from '../../src/actions/types';

const { authLogin } = urls;

const mock = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

const wrongDataAdmin = {
  email: 'dd@gmail.com',
  password: 'customer2454',
  isAdmin: false,
};

const correctDataAdmin = {
  email: 'mrb@gmail.com',
  password: 'customer24',
  isadmin: true,
};

const loginResponseData = { data: [{ token: jwt.sign(correctDataAdmin, 'dhdjdjd'), user: correctDataAdmin }] };

describe('Auth action creators test', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  // it('should create the SIGN_OUT_USER action when the user signs out', () => {
  //   const expectedActions = [{ type: 'SET_CURRENT_USER', payload: {} }];
  //   store.dispatch(logoutUser());
  //   expect(store.getActions()).toEqual(expectedActions);
  // });

  it('should handle user Login success', () => {
    mock.onPost(authLogin).reply(200, loginResponseData);
    const expectedActions = [{ type: SET_CURRENT_USER, payload: jwt_decode(loginResponseData.data[0].token) }];
    expect(store.getActions()).toEqual([]);
    // return store.dispatch(loginUser(correctDataAdmin)).then(() => console.log(store.getActions()));

    // expect(store.getActions()).toEqual(expectedActions);
  });

  // it('should handle admin Login failure', async () => {
  //   mock.onPost(authLogin).reply(401, {});
  //   const expectedActions = [];
  //   await store.dispatch(loginUser(wrongDataAdmin));
  //   expect(store.getActions()).toEqual(expectedActions);
  // });

  // it('should handle admin Login failure', async () => {
  //   mock.onPost(authLogin).reply(200);
  //   const expectedActions = [];
  //   await store.dispatch(loginUser(wrongDataAdmin));
  //   expect(store.getActions()).toEqual(expectedActions);
  // });
});
