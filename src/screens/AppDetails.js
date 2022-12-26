import React from 'react'
import { SafeAreaView, ScrollView, View, Image, Text } from 'react-native'

const AppDetails = ({ route }) => {
  const {
    restaurants_id,
    restaurants_name,
    restaurants_categories,
    restaurants_image,
    restaurants_location,
    restaurants_rating,
    restaurants_desc
  } = route.params
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={{ padding: 35 }}>
            <View style={{ borderWidth: .2, marginHorizontal: 60, borderRadius: 5 }}>
              <Image source={{ uri: `http://192.168.1.9:5500/uploads/${restaurants_image}` }}
                style={{
                  margin: 20,
                  width: '80%',
                  height: 200,
                }} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
                {restaurants_id}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{restaurants_name}</Text>
              <Text style={{ marginTop: 10 }}>Kategori : {restaurants_categories}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <View>
                <Text>Rating :</Text>
                <Text>{Array(restaurants_rating)
                  .fill()
                  .map((_, i) => (
                    <Text style={{ display: 'flex' }}>⭐</Text>
                  ))}</Text>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <View>
                <Text style={{ alignItems: 'flex-end' }}>Lokasi :</Text>
                <Text>{restaurants_location}</Text>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <Text style={{ marginBottom: 10 }}>Deskripsi :</Text>
              <Text>{restaurants_desc}</Text>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>


    </>
  )
}

export default AppDetails