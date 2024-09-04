import { View, Text, TextInputBase, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const FormField = ({title , value , placeholder , handleText , otherstyles , ...props}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className="space-y-2">
      <Text className="text-gray-100 font-psemibold text-lg mt-3">{title}</Text>
      <View className="border bg-gray-100 focus:border-secondary-300 rounded-xl w-full h-16 border-2 flex flex-row items-center ">
      <TextInput
        placeholder={placeholder}
        
        value={value}
        onChangeText={handleText}
        className={`text-black text-base flex-1 font-psemibold px-3 ${otherstyles}`}
        secureTextEntry={title === "Password" && !showPassword}
        {...props}
      />

      {title === "Password" && (
        <TouchableOpacity className = "absolute right-2 translate-y-1"
        onPress={() => setShowPassword(!showPassword)}>
        
           <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
            
          </TouchableOpacity>
      )}

      </View>
    </View>
  )
}

export default FormField