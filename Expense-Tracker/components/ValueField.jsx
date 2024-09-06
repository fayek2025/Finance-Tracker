import { View, Text, TextInputBase, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ValueField = ({title , value , placeholder , handleText , otherstyles , ...props}) => {
 
  return (
    <View className="space-y-2">
      <Text className="text-gray-100 font-psemibold text-lg mt-3">{title}</Text>
      <View className="border bg-gray-100 rounded-xl focus:border-secondary-300 focus:border-b-4 w-full h-16 border-2 flex flex-row items-center ">
      <TextInput
        placeholder={placeholder}
        
        value={value}
        onChangeText={handleText}
        className={`text-black text-base flex-1 font-psemibold px-3 ${otherstyles}`}
        
        {...props}
      />

      

      </View>
    </View>
  )
}

export default ValueField