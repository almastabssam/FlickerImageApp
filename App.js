/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
import type {Node} from 'react';
import ImgListItem from './component/imageItem';
import {getImageList} from './services/service';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CustomSearch from './component/CustomSearchBar';
const DEVICE_WIDTH = Dimensions.get('window').width;
import {
  getAndSaveKeyValueInAsyncStorage,
  getSearchHistory,
} from './component/index';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [serviceData, setServiceData] = useState([]);
  const [listData, setListData] = useState([]);
  const [dummyList, setDummyList] = useState([]);
  const [dataCount, setDataCount] = useState(10);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //call service to get all data once on load
  useEffect(() => {
    //call service on ViewLoad
    getImageData();
  });
  const getSearchHistory = async text => {
    try {
      const getHistory = await getAndSaveKeyValueInAsyncStorage(text);
      let dummy = getHistory;
      console.log('Get Search History Success', dummy);
      setSearchHistory(dummy);
    } catch (error) {
      console.log('Get Search History error', error);
    }
  };
  const [searchHistory, setSearchHistory] = useState([]);

  function getImageData() {
    getImageList()
      .then(response => {
        if (response.status === 200) {
          if (response.data.photos.photo.length > 0) {
            console.log('response Success', response.data.photos.photo);
            setServiceData(response.data.photos.photo);
            getMoreRecords();
            setLoading(false);
          }
        } else {
          setLoading(false);

          console.log('response error', response.status);
        }
      })
      .catch(error => {
        setLoading(false);

        console.log('error', error);
      });
  }
  // get records on the base of dataCount like first 10 then 20 and so on
  function getMoreRecords() {
    console.log('Service Data after call', serviceData);
    setListData(serviceData.slice([0], [dataCount]));
    setDataCount(dataCount + 10);
  }
  async function searchData(text) {
    if (text == '') {
      setSearchHistory([]);
      setSearchText('');
    } else {
      console.log('Searched Text', text);
      const newData = listData.filter(item => {
        const itemData = item.title.toUpperCase();
        const textData = text.toUpperCase();
        console.log('Data Match', itemData.indexOf(textData) > -1);
        return itemData.indexOf(textData) > -1;
      });
      console.log('Data List After Match ', newData);
      setDummyList(newData);
      setSearchText(text);
    }
  }

  const renderItem = item => {
    return <ImgListItem item={item} />;
  };

  const renderItemForSearchHistory = item => {
    if (item.item.title !== '') {
      return (
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              setSearchText(item.item.title);
              searchData(item.item.title);
              setSearchHistory([]);
            }}
            style={styles.title}>
            <Text style={styles.title}>{item.item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const handleSelection = id => {
    var selectedId = this.state.selectedId;

    if (selectedId === id) {
      this.setState({selectedItem: null});
    } else {
      this.setState({selectedItem: id});
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/*<ScrollView*/}
      {/*  contentInsetAdjustmentBehavior="automatic"*/}
      {/*  contentContainerStyle={{flexGrow: 1}}*/}
      {/*  style={{flex: 1}}>*/}
      <View
        style={{
          flex: 1,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 1,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10,
            zIndex: 1,
            position: 'absolute',
            width: '100%',
          }}>
          <TextInput
            style={{
              width: '90%',
              margin: 5,
              height: 40,
            }}
            onChangeText={text => searchData(text)}
            value={searchText}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key != 'Backspace') {
                getSearchHistory(searchText);
              }
            }}
          />
          {searchHistory.length > 0 && (
            <View style={styles.suggestionContainer}>
              <FlatList
                nestedScrollEnabled={true}
                style={{
                  margin: 5,
                  flex: 1,
                }}
                data={searchHistory}
                renderItem={item => renderItemForSearchHistory(item)}
              />
            </View>
          )}
        </View>
        {/*<CustomSearch*/}
        {/*  searchText={searchText}*/}
        {/*  listData={listData}*/}
        {/*  searchActionOnChange={() => searchData(searchText)}*/}
        {/*/>*/}
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center', //Centered horizontally
              alignItems: 'center', //Centered vertically
              flex: 1,
              height: '100%',
              width: '100%',
            }}>
            {listData.length > 0 ? (
              <FlatList
                style={{
                  marginTop: 60,
                  flex: 1,
                  height: '100%',
                  width: '100%',
                }}
                numColumns={2} // set number of columns
                columnWrapperStyle={styles.row} // space them out evenly
                data={listData}
                keyExtractor={(item, index) => item.id}
                onEndReached={() => getMoreRecords()}
                onEndReachedThreshold={0.5}
                renderItem={item => renderItem(item)}
              />
            ) : (
              <Text
                style={[
                  styles.title,
                  {
                    height: 40,
                    width: '100%',
                    textAlign: 'center',
                    color: 'gray',
                    fontSize: 18,
                    alignSelf: 'center',
                  },
                ]}>
                No Record Found
              </Text>
            )}
          </View>
        )}
      </View>
      {/*</ScrollView>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    height: 56,
    marginBottom: 6,
    backgroundColor: '#00bcd4',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  suggestionContainer: {
    margin: 10,
    padding: 10,
    flexDirection: 'column',
    flex: 1,
    height: 200,
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  textInput: {
    textAlign: 'left',
    height: 42,
    backgroundColor: 'white',
    width: 40,
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  highlight: {
    fontWeight: '700',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flexGrow: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    color: 'black',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 40,
    marginTop: 40,
    borderRadius: 2,
    backgroundColor: 'black',
  },
  item: {
    margin: 10,
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    height: '100%',
    width: '100%',
  },
});

export default App;
