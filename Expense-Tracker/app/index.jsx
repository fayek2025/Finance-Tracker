import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

export default function App  ()  {
  return (
   <SafeAreaView className = "bg-gray-200 h-full"> 
        <ScrollView>
            <View className = "justify-center items-center flex-1 flex-row mt-10 w-full">
            <Text className ="text-white"> Hello</Text>

            </View>

            
        </ScrollView>


   </SafeAreaView>
  )
}

