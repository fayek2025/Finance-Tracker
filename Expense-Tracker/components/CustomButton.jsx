import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title , handlePress , containerStyles , textStyles}) => {
  return (
    <TouchableOpacity onPress={handlePress}
    activeOpacity={0.4}
    
    className={`bg-secondary-300 p-3 rounded-lg mt-5 justify-center items-center w-[300px] px-5  max-h-[100px] ${containerStyles}`} 
    
    >
            <Text className={`${textStyles}`}> 
                {title}
            </Text>
        </TouchableOpacity>
  )
}

export default CustomButton