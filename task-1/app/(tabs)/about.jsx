import { View, Text, ScrollView, TouchableOpacityBase } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native'


import { router } from 'expo-router'

const about = () => {

  



  const handlePress = async () => {
    if(form.name === "" || form.amount === "" || form.category === ""){
      Alert.alert("Error" , "Please fill in all fields")
    }
    
  
    try{
     
      router.replace('/home');
    }catch (error){
      console.error(error);
    }
  }


  
  return (
    <SafeAreaView className = "bg-gray-200 h-full ">
            
                    <View className ="width-full h-full px-4  mt-10 justify-center items-center">

                      <View className = "w-full h-[200px] bg-black-100 mx-3 rounded">
                        
                          <Text className = "text-secondary font-pbold text-2xl mt-6 mx-3"> Fayek Ahmed Rahat</Text>
                          <Text className = "text-white font-pbold text-2xl mt-4 mx-3">Roll-57</Text>
                          <Text className= "text-white font-pbold text-sm mt-4 mx-3"> Reg No: 2021511233 </Text>
                      </View>

                      <View className = "w-full h-[200px] bg-black-100 mx-3 mt-5 rounded">
                        
                          <Text className = "text-secondary font-pbold text-2xl mt-6 mx-3"> Nahin Ehsan Nilav</Text>
                          <Text className = "text-white font-pbold text-2xl mt-4 mx-3">Roll-31</Text>
                          <Text className= "text-white font-pbold text-sm mt-4 mx-3"> Reg No: 2021511333  </Text>
                      </View>


                    </View>
                    


            

    </SafeAreaView>
  )
}

export default about