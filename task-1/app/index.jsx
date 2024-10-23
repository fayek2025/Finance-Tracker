import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import images from '../constants/images'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { useGlobalContext } from '../context/globalContex'

export default function App  ()  {

  const {loading , isLogged} = useGlobalContext();



 if (!loading && isLogged)
 {
  return <Redirect href= "/home" />;
 }



  return (
   <SafeAreaView className = "bg-gray-200 h-full"> 
        <ScrollView contentContainerStyle ={{height: "100%"}}>
            <View className = " justify-center mt-10 w-full min-h-[85vp] px-5 ">
              <View className = " items-center ">
              {/* <Image source={images.image}  className="w-20 h-20 right-20" resizeMode='contain' /> */}
              <Text className ="text-secondary-100 font-pbold text-2xl mt-5 px-14 "> TASK 1</Text>


              </View>

              <View className ="items-center mt-8 px-5">
                  <Image source={images.frame}  className="max-w-[600px] h-[400px] w-full" resizeMode='contain' />

              </View>


              <View className = "items-center justify-center mt-5 px-3">
                  <Text className ="text-white font-pbold text-2xl"> Prepared By {''}

                  


                  </Text>
                  <Text className ="text-secondary-100 font-pbold text-2xl"> Fayek Ahmed Rahat</Text>
                    <Text className = "text-white font-pbold"> AND </Text>
                    <Text className ="text-secondary-100 font-pbold text-2xl"> Nahin Ehsan Nilav</Text>

                  
                <CustomButton title={"Get Started"}
                  textStyles={"text-black font-pbold text-lg "}
                  handlePress={() => router.push("/signIn")}
                
                />
                </View>
            </View>

            
        </ScrollView>
        <StatusBar style="light"  backgroundColor="#161622" />

   </SafeAreaView>
  )
}

