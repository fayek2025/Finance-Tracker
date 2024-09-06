import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomAccounts from './CustomAccounts'

const HorizontalCard = ({posts}) => {
  return (
    <FlatList
      data={posts}
        keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="flex flex-row">
          
          <Text className="text-3xl font-psemibold text-white mt-5">{item.title}</Text>
          
         
          
          
          
        </View>
      )}

    ListFooterComponent={() => (
        <View> 
        <CustomAccounts />

        </View>
    )}
      horizontal
      
      />

    )
}

export default HorizontalCard