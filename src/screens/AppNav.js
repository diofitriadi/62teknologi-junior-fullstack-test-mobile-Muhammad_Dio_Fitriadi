import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  RefreshControl,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';

const AppNav = () => {
  const navigation = useNavigation()
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();
  const [refetch, setRefetch] = useState(false);
  const [query, setQuery] = useState({
    restaurants_name: '',
  });


  useEffect(() => {
    const { restaurants_name } = query;
    setIsLoading(true);;
    axios
      .get(
        `http://192.168.1.9:5500/api/v1/restaurants/${restaurants_name ? `?restaurants_name=${restaurants_name}` : ''
        }`,
      )
      .then(res => {
        setIsLoading(false);
        setProducts(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        setIsError(err);
      });
  }, [refetch, query]);

  return (
    <View style={styles.container}>
      <View style={{ borderColor: 'red', borderWidth: 1, alignItems: 'center' }}>
        <Text
          style={{ fontSize: 20, fontWeight: '700', color: 'red', padding: 20 }}>
          RESTAURANTS LISTS
        </Text>
        <TextInput
          placeholder="search restaurants"
          onChangeText={e => {
            setRefetch(!refetch);
            setQuery(prevData => ({
              ...prevData,
              restaurants_name: e,
            }));
          }}
        />
      </View>
      <SafeAreaView>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          data={products.data}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                setRefetch(!refetch);
              }}
            />
          }
          ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: '#333' }} />
          )}
          renderItem={({ item, index }) => {
            return (
              <Pressable onPress={() => navigation.navigate('AppDetails', {
                restaurants_id: item.restaurants_id,
                restaurants_name: item.restaurants_name,
                restaurants_categories: item.restaurants_categories,
                restaurants_image: item.restaurants_image,
                restaurants_location: item.restaurants_location,
                restaurants_rating: item.restaurants_rating,
                restaurants_desc: item.restaurants_desc,
              })}>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      height: 140,
                      borderWidth: 1,
                      marginTop: 10,
                      marginHorizontal: 6,
                      padding: 5,
                    }}>
                    <Image
                      style={{ width: 130 }}
                      source={{
                        uri: `http://192.168.1.9:5500/uploads/${item.restaurants_image}`,
                      }}
                    />
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text>{item.restaurants_name}</Text>
                        <Text>{item.restaurants_categories}</Text>
                      </View>

                      <Text>{item.restaurants_location}</Text>
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
                        {Array(item.restaurants_rating)
                          .fill()
                          .map((_, i) => (
                            <Text style={{ display: 'flex' }}>⭐</Text>
                          ))}
                      </View>
                      <View style={{ width: 300, height: 100 }}>
                        <Text>{item.restaurants_desc}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNav;
