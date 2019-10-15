import React, { ReactElement } from 'react';
import 'react-native';
import { create } from 'react-test-renderer';

import { Home } from '../HomePage';

describe('HomeScreen', () => {
  // Using `create` from `react-test-renderer`, it is possible to convert
  // the rendered element into a JSON object as shown below. Using that
  // object is a simple way to test a rendered component.
  test('renders correctly', () => {
    const tree = create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Since `Home` is just a class, it can be tested like any other
  // class without the need to render.
  test('should not have any props', () => {
    // Type coercion is done to bypass the null check. In application code,
    // you should check that the value itself is not null.
    const home = Home({}) as ReactElement;
    expect(Object.keys(home.props).length).toEqual(2);
  });
});
