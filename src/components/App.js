import React, { Component } from 'react';
import {
  Text, Dimensions, Platform, FlatList,
  View, StyleSheet,
} from 'react-native';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import HomeScreen from './HomeScreen';

import rootReducer from '../reducers'
const store = createStore(rootReducer)

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
  }
}

export default App;