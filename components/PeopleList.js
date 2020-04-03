import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Link} from 'react-router-native';
import AsyncStorage from '@react-native-community/async-storage';
import {format, parse, isToday, differenceInYears} from 'date-fns';

const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [search, setSearch] = useState('');

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
        peopleResponse.push({
          name: 'Today',
          id: 0,
          birthday: format(new Date(), 'yyyy-MM-dd'),
          isToday: true,
        });
        setPeople(
          peopleResponse.map(person => {
            const personBirthday = parse(
              person.birthday,
              'yyyy-MM-dd',
              new Date(),
            );
            return {
              ...person,
              birthdayNumbers: format(personBirthday, 'Mdd'),
              birthdayFormatted: format(personBirthday, 'M/dd'),
              age: `${differenceInYears(new Date(), personBirthday)}`,
              isToday: person.isToday || false,
            };
          }),
        );
      }
    };
    fetchPeople();
  }, []);

  useEffect(() => {
    const sortedPeople = [...people];
    sortedPeople.sort((a, b) => {
      if (+a.birthdayNumbers > +b.birthdayNumbers) {
        return 1;
      } else if (+a.birthdayNumbers < +b.birthdayNumbers) {
        return -1;
      }
      return 0;
    });
    setFilteredPeople(
      sortedPeople.filter(person => person.name.includes(search)),
    );
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
          value={search}
          autoCompleteType="off"
        />
      </View>
      {filteredPeople.map(person => (
        <View
          key={person.id}
          style={person.isToday ? styles.today : styles.person}>
          <Text style={styles.personName}>{person.name}</Text>
          {!person.isToday && <Text>{person.birthdayFormatted}</Text>}
          {!person.isToday && person.age && person.parent && (
            <Text>Age: {person.age}</Text>
          )}
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
  today: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#BEE3F8',
  },
  personName: {
    fontWeight: '600',
    fontSize: 24,
  },
});
export default PeopleList;
