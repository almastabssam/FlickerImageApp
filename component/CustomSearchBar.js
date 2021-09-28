/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {getKeyValueFromAsyncStorage, saveKeyValueInAsyncStorage} from './index';

const CustomSearch = async ({listData, searchText, searchActionOnChange}) => {
  const getSearchHistory = async () => {
    try {
      const getHistory = await getKeyValueFromAsyncStorage('SearchHistory');
      if (getHistory != null) {
        return JSON.parse(getHistory);
      } else {
        await saveKeyValueInAsyncStorage('SearchHistory', searchText);
      }
    } catch (error) {
      console.log('Get Search History');
    }
  };
  const [searchHistory, setSearchHistory] = useState(getSearchHistory());

  return (
    <View
      style={{
        flex: 1,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
      }}>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={searchActionOnChange()}
        value={searchText}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />
      {searchHistory && <View style={styles.suggestionContainer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionContainer: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'red',
    flex: 1,
    height: 100,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default CustomSearch;
