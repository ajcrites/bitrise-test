/**
 * This represents a simple screen-level container component with rendering
 * and styling that is hooked up to the redux store.
 */

import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { connect } from 'react-redux';

import { config } from 'src/config';
console.warn(config.REMOVE_ME);

// Export component without provider for testing purposes
export const Home: FunctionComponent = () => (
  <View style={styles.container}>
    <Text style={styles.textContent}>Edit or remove this file.</Text>
  </View>
);

// Connected component is used with Redux store
export const HomePage = connect()(Home);

// This helps auto-completion / type safety with `StyleSheet.create`
interface Style {
  container: ViewStyle;
  textContent: TextStyle;
}

// TypeScript hoists variables. We declare the styles here to keep them out of
// the way of the component definition
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  textContent: {
    fontSize: 25,
    textAlign: 'center',
  },
});
