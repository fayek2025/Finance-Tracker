import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const CustomButton = ({title , handlePress , containerStyles , textStyles  , isLoading}) => {
  return (
    
    <TouchableOpacity onPress={handlePress}
    activeOpacity={0.4}
    
    className={`bg-secondary-300 p-3 rounded-lg mt-5 justify-center items-center w-full px-5  max-h-[100px] ${containerStyles}`} 
    disabled = {isLoading}
    >
            <Text className={`${textStyles}`}> 
                {title}
            </Text>
        </TouchableOpacity>
  )
}

export default CustomButton