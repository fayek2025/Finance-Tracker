import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomAccounts from './CustomAccounts'

const HorizontalCard = ({posts}) => {
  return (
    <FlatList
      data={posts}
        keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className ="px-3 mt-4 ">
          <View className="w-[100px] h-[100px] bg-transparent border border-secondary-200 rounded-xl justify-center items-center">
          <Text numberOfLines={1} className="text-lg font-pbold text-white absolute top-3 right-1 px-2">{item.name}</Text>
          <Text className="text-sm font-psemibold text-gray-10 top-9 right-1 px-2 absolute">{item.amount} TK</Text>
          </View>
          
          
         
          
          
          
        </View>
      )}

    ListFooterComponent={() => (
        <View> 
        <CustomAccounts title={"Account"}/>

        </View>
    )}
      horizontal
      
      />

    )
}

export default HorizontalCard