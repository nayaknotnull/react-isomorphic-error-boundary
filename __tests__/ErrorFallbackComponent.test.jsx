import React from 'react';
import { shallow } from 'enzyme';
import FallbackErrorComponent from '../src/ErrorFallbackComponent';

describe('<ErrorFallbackComponent />', () => {
  let ErrorFallbackComponentTag = '';
  const props = {};

  test('renders correctly', () => {
    ErrorFallbackComponentTag = shallow(<FallbackErrorComponent {...props} />);
    expect(ErrorFallbackComponentTag).toMatchSnapshot();
  });
});
