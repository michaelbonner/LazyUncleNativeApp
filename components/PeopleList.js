import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link} from 'react-router-native';
import AsyncStorage from '@react-native-community/async-storage';

const PeopleList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const peopleResponse = await fetch('https://lazyuncle.net/api/person', {
        method: 'GET',
        headers,
      }).then(response => response.json());

      if (peopleResponse) {
        setPeople(peopleResponse);
      }
    };
    fetchPeople();
  }, []);

  return (
    <View>
      <Text>People</Text>
      <Link to="/">
        <Text>Go to home</Text>
      </Link>
      {people.map(person => (
        <View key={person.id} style={styles.person}>
          <Text style={styles.personName}>{person.name}</Text>
          <Text>{person.birthday}</Text>
          {person.parent && <Text>Parent: {person.parent}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  person: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  personName: {
    fontSize: 24,
  },
});
export default PeopleList;
