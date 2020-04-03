/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeRouter, Route} from 'react-router-native';
import Home from './components/Home';
import PeopleList from './components/PeopleList';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <NativeRouter>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Route exact path="/" component={Home} />
            <Route exact path="/people" component={PeopleList} />
          </ScrollView>
        </NativeRouter>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

export default App;
