import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const TabIcon = ({name , color , focused , size , label}) =>
  {
      return( 
        <View className = "justify-center items-center flex">
          

          <FontAwesome5  name= {name} size= {size} color= {color} />


      
     
  
      <Text 
      
     clasName = {`text-xs  ${focused ? 'font-pextrabold' : 'text-pdmedium'}`}
      style={{ color: color }}
      > {label}</Text>
  
      </View>
      )
  }

const tabs = () => {
  return (
    <Tabs
    screenOptions={{ tabBarActiveTintColor: 'blue',
          
      tabBarShowLabel : false ,

      tabBarActiveTintColor : "#6df561",
      tabBarInactiveTintColor : "#CDCDE0",
      tabBarStyle : {
        backgroundColor : "#1F1F2E",
        borderTopWidth : 2,
        height : 84,
        borderTopColor : "#232533",
      },}}
    
    >

        <Tabs.Screen name='home'  
        
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="home" color={color} size={25} focused={focused} label = "Home" />
          ),
        }}/>


<Tabs.Screen name='contact'  
        
        options={{
          title: 'Contact',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="monero" color={color} size={25} focused={focused} label = "Trasaction" />
          ),
        }}/>






        <Tabs.Screen name='about'  
        
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="address-book" color={color} size={25} focused={focused} label = "Create" />
          ),
        }}/>





    </Tabs>

        


  )
}

export default tabs