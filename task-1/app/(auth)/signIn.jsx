import { View, Text, SafeAreaView, ScrollView , Image} from 'react-native'
import React, { useState } from 'react'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'
import { Alert } from 'react-native'



const signIn = () => {



  const [submiting , setSubmiting] = useState(false);
  

  const [user , setUser] = useState("");

        const submit =  () => {
          if(user === "" ){
            Alert.alert("Error" , "Please fill in all fields")
          }

            setSubmiting(true)
            try{
             
              router.replace('/home' , {user});


            }catch (error){

              console.error(error)

            }finally{
              setSubmiting(false)}


        }
            


  return (
    <SafeAreaView className = "bg-gray-200 h-full">
          <ScrollView contentContainerStyle ={{height: "100%"}}>
          <View className ="w-full justify-center min-h-[85vh]  px-6">


            <Text className="text-gray-100 font-psemibold text-2xl">Login To {''} 
            <Text className="text-secondary-100"> Our World-Breaking App</Text>



            </Text>

            <FormField    
            title="Username" 
            placeholder="Enter Your Username" 
            value={user}
            handleText={(e) => setUser({e})}
            

            />

              

            <CustomButton title={"Sign in"} 
            handlePress={submit}
            textStyles={"font-pbold text-lg text-black"}
            containerStyles={"mt-10"}
            isLoading={submiting}
            
            />

            
          </View>
        
        </ScrollView>
      </SafeAreaView>
  )
}


export default signIn