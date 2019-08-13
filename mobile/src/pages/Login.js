import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import tindevService from '../services/tindev';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [username, setUsename] = useState(''); 

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if(user) {
        navigation.navigate('Home', { user });
      }
    })
  }, []);

  async function login() {
    const res = await tindevService.post('/dev', { username });

    const { _id } = res.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Home', { user: _id });
  }

  return (
    <View style={styles.container}>
      <Image source={logo} />
      <TextInput
        autoCapitalize='none'
        autoCorrent={false}
        placeholder="Digite seu usuario do github"
        placeholderTextColor="#999"
        style={styles.input}
        value={username}
        onChangeText={setUsename} />
      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.text}>Entrar</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  input: {
    height: 46,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    borderRadius: 4,
    marginTop: 15,
    backgroundColor: '#df4723',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17
  }
});