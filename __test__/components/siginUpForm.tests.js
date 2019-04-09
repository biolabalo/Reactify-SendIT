import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import SignUpform from '../../src/components/auth/SignUpform';

const props = {
  auth: {
    isLoading: false,
    isAuthenticated: true,
    user: {
      firstName: 'Akeem',
      lastName: 'Balogun',
      registered: '22-03-2019',
      email: 'biola@gmail.com',
      isadmin: false,
    },
  },
};

let wrapper;
const onChange = jest.fn();
const handleSubmit = jest.fn();

const mockStore = configureStore([thunk]);
const store = mockStore(props);


describe('SignInform Component', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Provider store={store}>
        <SignUpform/>
        </Provider>
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
