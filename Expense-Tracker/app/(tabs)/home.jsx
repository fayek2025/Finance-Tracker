import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'

const home = () => {
  return (
    <SafeAreaView className = "bg-gray-200 h-full">


      <FlatList 
      data={[{id:1}]}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View className="px-5">
          <Text className="text-white">{item.id}</Text>
        </View>
      )}

      ListHeaderComponent={() => (
        <View className= "my-10 px-6 space-y-2 ">

          <View className="flex-row flex justify-between items-start">
            <View>

            <Text className ="text-white font-psemibold text-lg">Welcome</Text>
            <Text className ="text-white font-psemibold text-secondary-200">Fayek</Text>
            </View>

            <View className="mt-5 px-2">

              <Text className="text-xl text-secondary-100 font-pbold "> CashFlow</Text>
            </View>
            </View>
          
        </View>
      )}
      
      
      
      />



    </SafeAreaView>
  )
}

export default home