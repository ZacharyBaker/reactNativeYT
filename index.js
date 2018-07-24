/** @format */

import React, {Component} from 'react';
import {View} from 'react-native';
import {AppRegistry, StyleSheet} from 'react-native';
import GnarBox from './App';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import {name as appName} from './app.json';

const store = createStore(reducer);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.appContainer}>
          <GnarBox />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);


const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
});