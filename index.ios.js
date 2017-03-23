/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Immutable from 'immutable';
import ImmutableListView from 'react-native-immutable-list-view';

export default class DemoPullRefresh extends Component {

  state = {
    data: Immutable.List([1, 2, 3]),
    isRefreshing: false,
  };

  refreshDataReal() {
    console.log('Refreshing...');
    this.setState({ isRefreshing: true });

    setTimeout(() => {
      this.setState({ data: Immutable.List([1, 2, 3]) });
    }, 50);

    setTimeout(() => {
      console.log('Refreshed.');
      this.setState({ isRefreshing: false });
    }, 100);
  }

  refreshDataMock() {
    console.log('Refreshing...');
    this.setState({ isRefreshing: true });

    setTimeout(() => {
      console.log('Refreshed.');
      this.setState({ isRefreshing: false });
    }, 500);
  }

  handlePullRefresh() {
    console.log('Pulled to refresh');
    this.refreshDataMock();
  }

  handleButtonPress() {
    console.log('Clicked button');
    this.refreshDataReal();
  }

  render() {
    const { data, isRefreshing } = this.state;

    console.log('@@@ render, refreshing:', isRefreshing);

    return (
      <View
        style={styles.container}
      >
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableOpacity onPress={() => this.handleButtonPress()}>
          <Text style={styles.instructions}>
            Click here to change data (or pull to mock refresh)
          </Text>
        </TouchableOpacity>
        <ImmutableListView
          contentContainerStyle={styles.listView}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={() => this.handlePullRefresh()} />
          }
          immutableData={data}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('DemoPullRefresh', () => DemoPullRefresh);
