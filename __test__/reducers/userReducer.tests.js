import {
  GET_All_USERS, SHOW_ASIDE, HIDE_ASIDE, SET_PAGES,
  GET_ERROR, USER_IS_LOADING
} from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/userReducer';

const allUsers = [
  {
    firstName: 'Tiku',
    lastName: 'Okoye',
    isAdmin: false,
    id: 1
  },
  {
    firstName: 'Tiku',
    lastName: 'Okoye',
    isAdmin: false,
    id: 1
  },
  {
    firstName: 'Tiku',
    lastName: 'Okoye',
    isAdmin: false,
    id: 1
  }
];

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      allUsers: [],
      show: false,
      pages: null,
      isLoading: false,
      error: ''
    });
  });
  it('should get all users', () => {
    const successAction = {
      type: GET_All_USERS,
      payload: allUsers,
    };
    expect(reducer({}, successAction))
      .toEqual({
        allUsers
      });
  });
  it('should show the aside nav', () => {
    const successAction = {
      type: SHOW_ASIDE,
    };
    expect(reducer({}, successAction))
      .toEqual({
        show: true,
        isLoading: false,
      });
  });
  it('should hide the aside nav', () => {
    const successAction = {
      type: HIDE_ASIDE,
    };
    expect(reducer({}, successAction))
      .toEqual({
        show: false,
        isLoading: false,
      });
  });
  it('should set the number of pages for pagination', () => {
    const successAction = {
      type: SET_PAGES,
      payload: 2
    };
    expect(reducer({}, successAction))
      .toEqual({
        pages: 2,
        isLoading: false,
      });
  });
  it('should show loading', () => {
    const successAction = {
      type: USER_IS_LOADING,
    };
    expect(reducer({}, successAction))
      .toEqual({
        isLoading: true,
      });
  });
  it('should show an error message', () => {
    const successAction = {
      type: GET_ERROR,
      payload: 'Error getting all users'
    };
    expect(reducer({}, successAction))
      .toEqual({
        error: 'Error getting all users',
        isLoading: false,
      });
  });
});