import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomAccounts from './CustomAccounts'
import { StyleSheet } from 'react-native';
import styles from 'react-native'
import { TouchableOpacity } from 'react-native';

const Circle = () => {
  return <View style={styles.circle} />;
};



const HorizontalCard = ({posts}) => {
  return (
    <FlatList
      data={posts}
        keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className ="px-3 mt-4 ">
          
            <TouchableOpacity className="h-full">
          <View 
            style={{borderColor: item.color}}
          className="w-40 h-40 flex-1  bg-gray-80 border rounded-xl border-secondary justify-center items-center">
            <View>
              <View className="w-10 h-10 rounded-full absolute left-6 bottom-8 " 
              style={{backgroundColor: item.color}}
              
              />

            </View>
          <Text numberOfLines={1} className="text-lg font-pbold text-white top-8 absolute right-1 px-2 mt-6">{item.name}</Text>
          <Text className="text-lg font-psemibold text-gray-10 top-12 right-1 px-2 absolute mt-10">{item.amount} BDT</Text>
          </View>
          
          
         
          
          </TouchableOpacity>
          
        </View>

       
      )}

    ListFooterComponent={() => (
        <View> 
        <CustomAccounts title={"Account"}/>

        </View>
    )}
      horizontal
      showsHorizontalScrollIndicator={false}
      />

    )
}

export default HorizontalCard