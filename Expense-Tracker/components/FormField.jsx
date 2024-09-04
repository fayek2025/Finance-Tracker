import { View, Text, TextInputBase, TextInput } from 'react-native'
import React from 'react'

const FormField = ({title , value , placeholder , handleText , otherstyles , ...props}) => {
  return (
    <View>
      <Text className="text-gray-100 font-psemibold text-lg">{title}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={handleText}
        className={`bg-gray-100 p-3 rounded-lg mt-2 w-full ${otherstyles}`}
        {...props}
      />
    </View>
  )
}

export default FormField