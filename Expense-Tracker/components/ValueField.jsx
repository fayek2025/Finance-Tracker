import { View, Text, TextInputBase, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ValueField = ({title , value , placeholder , handleText , keybaordType, otherstyles , editable , ...props  }) => {
 
  return (
    <View className="space-y-2">
      <Text className="text-gray-100 font-psemibold text-lg mt-3">{title}</Text>
      <View className="  border-transparent bg-transparent rounded-xl  h-16 flex flex-row items-center justify-center " >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#9CA3AF"}
        value={value}
        onChangeText={handleText}
        className="block  py-3 px-3 font-pbold text-base text-black bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary-200  focus:secondary-200 peer  justify-center w-full"
        keyboardType={ keybaordType}
        numberOfLines={1}
        editable={editable}
        {...props}
      />

      

      </View>
    </View>
  )
}

export default ValueField