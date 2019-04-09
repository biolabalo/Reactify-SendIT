import React from 'react';
import { shallow } from 'enzyme';
import SignIn from '../../src/components/auth/SignIn';

describe('<SignIn Component />', () => {
  const wrapper = shallow(<SignIn />);
  it('should render a like component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find(<SignIn/>)).toHaveLength(0);
  });
});
