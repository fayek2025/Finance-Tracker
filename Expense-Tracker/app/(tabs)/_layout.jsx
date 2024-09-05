import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
const TabIcon = ({name , color , focused , size , label}) =>
  {
      return( 
        <View className = "justify-center items-center flex">
      
      <Ionicons name= {name} size= {size} color= {color} />
  
      <Text 
      
      className={`${focused ? "font-semibold" : "font-pregular"} text-xs`}
      style={{ color: color }}
      > {label}</Text>
  
      </View>
      )
  }

const tabs = () => {
  return (
    <Tabs
    Ta
    
    >

        <Tabs.Screen name='home'  
        
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="home" color={color} size={25} focused={focused} label = "Home" />
          ),
        }}/>

    </Tabs>
  )
}

export default tabs