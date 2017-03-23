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
    isRefreshing: false,
  };

  refreshDataQuickly() {
    console.log('Refreshing...');
    this.setState({ isRefreshing: true });

    setTimeout(() => {
      console.log('Refreshed.');
      this.setState({ isRefreshing: false });
    }, 10);
  }

  refreshDataSlowly() {
    console.log('Refreshing...');
    this.setState({ isRefreshing: true });

    setTimeout(() => {
      console.log('Refreshed.');
      this.setState({ isRefreshing: false });
    }, 1000);
  }

  handlePullRefresh() {
    console.log('Pulled to refresh');
    this.refreshDataSlowly();
  }

  handleButtonPress() {
    console.log('Clicked button');
    this.refreshDataQuickly();
  }

  render() {
    const { isRefreshing } = this.state;

    return (
      <View
        style={styles.container}
      >
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableOpacity onPress={() => this.handleButtonPress()}>
          <Text style={styles.instructions}>
            Click here to quick-refresh (or pull to slow-refresh)
          </Text>
        </TouchableOpacity>
        <ImmutableListView
          contentContainerStyle={styles.listView}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={() => this.handlePullRefresh()} />
          }
          immutableData={Immutable.List([1, 2, 3])}
          renderRow={(rowData) => <View><Text>{rowData}</Text></View>}
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
