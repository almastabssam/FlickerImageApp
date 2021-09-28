import React from 'react';
// import {AsyncStorage} from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getImageURLStr = (farm, server, id, secret) => {
  if (farm == ' ' || server == ' ' || id == ' ' || secret == ' ') {
    return true;
  } else {
    const url = `http://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`;
    return url;
  }
};

export const getSearchHistory = async () => {
  var getHistory = await AsyncStorage.getItem('@SearchHistory');

  if (getHistory != null) {
    var historyArray = JSON.parse(getHistory);
    return historyArray;
  }
};

export const getAndSaveKeyValueInAsyncStorage = async searchText => {
  try {
    var getHistory = await AsyncStorage.getItem('@SearchHistory');

    if (getHistory != null) {
      var historyArray = JSON.parse(getHistory);
      // if (historyArray.map(a => a.id).includes(searchText)) {
      //   console.log('Exists');
      // } else {
      const arraDict = {
        id: historyArray.length + 1,
        title: searchText,
      };
      historyArray = historyArray.concat(arraDict);
      console.log('History Array more than 1st time', historyArray);
      await AsyncStorage.setItem(
        '@SearchHistory',
        JSON.stringify(historyArray),
      );
      // }
      return historyArray;
    } else {
      var historyArr = [];
      const arraDict = {
        id: 1,
        title: searchText,
      };
      historyArr = historyArr.concat(arraDict);
      console.log('History Array first time', historyArr);
      await AsyncStorage.setItem('@SearchHistory', JSON.stringify(historyArr));
      return historyArr;
    }
  } catch (error) {
    // Error saving data
    console.log('Error saving data In Async');
  }
};
