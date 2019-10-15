import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import { HomePage } from 'src/home/HomePage';
import { configureStore } from 'src/store';

const AppStack = createStackNavigator({
  Home: HomePage,
});
const AppContainer = createAppContainer(AppStack);

export class App extends Component {
  store = configureStore();

  componentDidCatch() {
    if (__DEV__) {
      console.error('check error console');
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppContainer />
      </Provider>
    );
  }
}
