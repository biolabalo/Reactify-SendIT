import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { getAllUsers } from '../../src/actions/userActions';
import {
  SET_PAGES, GET_ERROR, USER_IS_LOADING, GET_All_USERS
} from '../../src/actions/actionTypes';


describe('Get all users', () => {
  const res = {
    data: [
      {
        firstName: 'tiku',
        lastName: 'okoye'
      },
      {
        firstName: 'tiku',
        lastName: 'okoye'
      }
    ],
    pages: 2
  };

  const errorRes = {
    message: 'Internal server error'
  };
  it('dispatches the correct actions on successful fetch request', (done) => {
    fetch.mockResponse(JSON.stringify(res));

    const expectedActions = [
      { type: USER_IS_LOADING },
      { type: GET_All_USERS, payload: res.data },
      { type: SET_PAGES, payload: res.pages }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({ allUsers: [] }, expectedActions, done);

    store.dispatch(getAllUsers(res))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('dispatches the correct actions on unsuccessful fetch request', (done) => {
    fetch.mockReject(errorRes.message);

    const expectedActions = [
      { type: USER_IS_LOADING },
      {
        type: GET_ERROR,
        payload: errorRes.message,
      }
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({ user: {}, isAuthenticated: false }, expectedActions, done);

    store.dispatch(getAllUsers(errorRes))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});