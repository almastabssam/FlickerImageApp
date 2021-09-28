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
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getImageURLStr} from './index';
const imageItem = ({item}) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
        height: 200,
      }}>
      <FastImage
        style={{width: '100%', height: '75%'}}
        source={require('../assets/images/flickr.jpeg')}
      />
      <Text
        style={{
          height: '10%',
          width: '90%',
          textAlign: 'center',
          fontSize: 15,
        }}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.item.title}
      </Text>
      <Text
        style={{
          height: '10%',
          width: '90%',
          textAlign: 'center',
          fontSize: 15,
        }}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.item.id}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'red',
  },
  imgContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ddd',
    height: 150,
    width: 120,
  },
  textStyle: {
    height: '10%',
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default imageItem;
