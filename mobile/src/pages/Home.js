import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


import logo from '../assets/logo.png';
import likeIcon from '../assets/like.png';
import dislikeIcon from '../assets/dislike.png';

import tindevService from '../services/tindev';


export default function Home({ navigation }) {

  const id = navigation.getParam('user')

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await tindevService.get('/dev', {
        headers: { user: id }
      });

      setUsers(res.data);
    }

    loadUsers();
  }, [id]);

  async function like() {
    const [user, ...rest] = users;
    await tindevService.post(`/dev/${user._id}/like`, null, { headers: { user: id } });

    setUsers(rest);
  }

  async function dislike() {
    const [user, ...rest] = users;
    await tindevService.post(`/dev/${user._id}/dislike`, null, { headers: { user: id } });

    setUsers(rest);
  }

  async function logout() {
    await AsyncStorage.clear();
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <View style={styles.cardContainer}>

        {users.length > 0 ?
          users.map((user, index) => (
            <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
              <Image style={styles.image} source={{ uri: user.avatar }} />
              <View style={styles.footer}>
                <Text style={styles.textName}>{user.name}</Text>
                <Text style={styles.textBio} numberOfLines={3}>{user.bio}</Text>
              </View>
            </View>
          ))
          :
          <Text style={styles.empty}>Acabou :(</Text>
        }

      </View>

      {users.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={dislike}>
            <Image source={dislikeIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={like}>
            <Image source={likeIcon} />
          </TouchableOpacity>
        </View>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    marginTop: 20
  },
  cardContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500
  },
  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    flex: 1,
    height: 300
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  textName: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  textBio: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
    lineHeight: 18
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 1
  },
  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold'
  }
})