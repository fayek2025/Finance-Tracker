import { View, Text, SafeAreaView, ScrollView , Image} from 'react-native'
import React from 'react'
import images from '../../constants/images'
import FormField from '../../components/FormField'

const signIn = () => {
  return (
    <SafeAreaView className = "bg-gray-200 h-full">
          <ScrollView contentContainerStyle ={{height: "100%"}}>
          <View className ="w-full justify-center min-h-[85vh] px-6">


            <Text className="text-gray-100 font-psemibold text-2xl">Login To {''} 
            <Text className="text-secondary-100"> CashFlow</Text>



            </Text>

            <FormField title="Email" placeholder="Enter your email" />
          </View>
        
        </ScrollView>
      </SafeAreaView>
  )
}

export default signIn