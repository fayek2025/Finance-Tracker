import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const tabs = () => {
  return (
    <Tabs>

        <Tabs.Screen name='home'  options={{headerShown : "false"}}/>

    </Tabs>
  )
}

export default tabs