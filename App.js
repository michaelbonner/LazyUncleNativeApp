/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Formik} from 'formik';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text style={styles.welcomeText}>Welcome Lazy Uncle</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={values => {
              const response = fetch('https://lazyuncle.net/api/login', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              })
                .then(response => response.json())
                .then(json => {
                  console.log('json', json);
                  return json.movies;
                });

              console.log('response', response);
              console.log(values);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Sign in</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="email"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="password"
                    secureTextEntry={true}
                    textContentType="password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <Button
                    title="Log In"
                    color="#4299E1"
                    accessibilityLabel="Log in"
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />
                </View>
              </View>
            )}
          </Formik>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Sign up for an account</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 48,
    paddingBottom: 48,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
  },
});

export default App;
