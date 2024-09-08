import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { TouchableOpacity , Modal  } from 'react-native'
import { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { Alert } from 'react-native'
import ValueField from './ValueField'
import CustomButton from './CustomButton'
import { addAccount } from '../lib/appwrite'
import { useGlobalContext } from '../context/globalContex'

const CustomAccounts = ({title , refetchAccount , header}) => {

  const [selectColor , setSelectColor] = useState(null)


  const colors = ['#79c142' , '#3aa76a' , '#1ab1b7' , '#1f6f8b' , '#2a4175' , '#3f007d' , '#7a00d4' , '#b600e0' , '#e100d8' , '#ff00b8' , '#ff0074' , '#ff0000' , '#ff6a00' , '#ffcc00' , '#a6d608' , '#4f9300' , '#00a6a6' , '#0074a2' , '#004d6d' , '#002a3a' , '#000000' , '#4d4d4d' , '#7a7a7a' , '#b2b2b2' , '#e6e6e6' , '#ffffff']

  const {user} = useGlobalContext();

  const [form, setForm] = useState({
    accountName: "",
    amount: ""
})

  const [submiting , setSubmiting] = useState(false);

  const handlePress = async () => {

    if(form.accountName === "" || form.amount === ""){
      Alert.alert("Error" , "Please fill in all fields")
    }
    setSubmiting(true);
    const amountAsInteger = parseInt(form.amount, 10);

    try{
      await addAccount(form.accountName , amountAsInteger , user.$id , selectColor);
     
      refetchAccount();
      setModalVisible(false);

    }catch (error){
      console.error(error);
    }finally{
      setSubmiting(false);
    }
  
  
  
  }
  


  

   
  
    const [modalVisible, setModalVisible] = useState(false);  
    return (
       
  

    <View className="p-5 w-[150px] h-[150px]">

      

        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)} // Set modal visible when pressed
          className="bg-transparent border border-secondary p-3 rounded-xl justify-center items-center"
        >
             <FontAwesome5  name="plus" size={24} color="white" />

          <Text className="text-white font-pregular text-sm">
            {title}
          </Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible} // Show modal based on state
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(false); // Close modal when the request is made
          }}
        >
            
          
          <View className="flex-1 justify-center  bg-gray-300 px-6">

          <View className="px-5 absolute top-2">
            <TouchableOpacity
                onPress={() => setModalVisible(false)} // Close modal when pressed
                className=" mt-5 rounded"
                
              >
               <FontAwesome5 name="arrow-left" size={20} color="white" />
              </TouchableOpacity>
            </View>

              <View className="mt-20">

              
              <Text className="text-gray-100 font-psemibold text-3xl mt-5 ">{header}</Text>

                <ValueField 
                 placeholder="Name"
                 value={form.accountName} // The actual value of the field
            onChangeText={(e) => setForm({ ...form, accountName: e })}
                
                
                />
                <ValueField     
                placeholder="Amount" 
                value={form.amount} // The actual value of the field
                onChangeText={(e) => setForm({ ...form, amount: e })}
                keybaordType="numeric"
                
                />
                  </View>
                <View className="flex flex-row flex-wrap justify-center items-center mt-5">
                {colors.map((color, index) => (
        <TouchableOpacity
          onPress={() => setSelectColor(color)} // Set color when pressed
          key={index}
          style={{ backgroundColor: color }}
          className={`w-10 h-10 rounded-full mt-5  mx-2 focus:outline-none ${selectColor === color ? (selectColor === '#ffffff' ? 'border-2 border-black' : 'border-2 border-white') : ''}`}
        />
      ))}
                  </View>

                  <View className="justify-content items-center">
                  <CustomButton title="Create" 
                textStyles={"font-psemibold text-lg"}
                handlePress={handlePress}
                containerStyles={"w-[200px] h-[50px] mt-4"}
                />

                  </View>

               
               
              
            
          </View>

      
        </Modal>

       
      </View>

     
  )
}


export default CustomAccounts