import { View, Text, SafeAreaView, ScrollView , Image} from 'react-native'
import React, { useState } from 'react'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const signIn = () => {

  const [form , setForm] = useState({
    email: "",
    password: ""
  })
  return (
    <SafeAreaView className = "bg-gray-200 h-full">
          <ScrollView contentContainerStyle ={{height: "100%"}}>
          <View className ="w-full justify-center min-h-[85vh] px-6">


            <Text className="text-gray-100 font-psemibold text-2xl">Login To {''} 
            <Text className="text-secondary-100"> CashFlow</Text>



            </Text>

            <FormField    
            title="Email" 
            placeholder="Enter your email" 
            value={form.email}
            handleText={(e) => setForm({...form , email: e})}
            

            />

              <FormField 
              title="Password" 
              placeholder="Enter your password"
              value={form.password}
              handleText={(e) => setForm({...form , password: e})}
              otherstyles="" 
            />

            <CustomButton title={"Sign in"} 
            handlePress={() => console.log(form)}
            textStyles={"font-pbold text-lg text-black"}
            containerStyles={"mt-10"}
            
            />
          </View>
        
        </ScrollView>
      </SafeAreaView>
  )
}

export default signIn