import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Link} from 'react-router-native';
import AsyncStorage from '@react-native-community/async-storage';

const Home = () => {
  return (
    <>
      <Text style={styles.welcomeText}>Welcome to Lazy Uncle</Text>
      <Link to="/people">
        <Text>Go to People</Text>
      </Link>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={async values => {
          const loginResponse = await fetch(
            'https://lazyuncle.net/api/auth/login',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            },
          )
            .then(response => response.json())
            .then(json => {
              console.log('json', json);
              return json;
            });

          await AsyncStorage.setItem(
            '@LazyUncle:token',
            loginResponse.access_token,
          );
          await AsyncStorage.setItem(
            '@LazyUncle:token_expires',
            `${loginResponse.expires_in}`,
          );
          await AsyncStorage.setItem(
            '@LazyUncle:token_type',
            loginResponse.token_type,
          );
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
    </>
  );
};

const styles = StyleSheet.create({
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

export default Home;
