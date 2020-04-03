import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Link} from 'react-router-native';
import AsyncStorage from '@react-native-community/async-storage';

const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [search, setSearch] = useState([]);

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

  useEffect(() => {
    setFilteredPeople(people);
  }, [people]);

  useEffect(() => {
    setFilteredPeople(people.filter(person => person.name.includes(search)));
  }, [people, search]);

  return (
    <View>
      <Text>People</Text>
      <Link to="/">
        <Text>Go to home</Text>
      </Link>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          onChangeText={text => setSearch(text)}
          onBlur={text => setSearch(text)}
          value={search}
        />
      </View>
      {filteredPeople.map(person => (
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
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 18,
    fontWeight: '600',
  },
  person: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  personName: {
    fontWeight: '600',
    fontSize: 24,
  },
});
export default PeopleList;
