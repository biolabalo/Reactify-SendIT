import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../src/components/404';

describe('<NotFoundPage Component />', () => {
  const wrapper = shallow(<NotFoundPage />);
  it('should render a like component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find(<NotFoundPage />)).toHaveLength(0);
  });
});
