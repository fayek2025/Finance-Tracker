import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity , Modal  } from 'react-native'
import { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { Alert } from 'react-native'
import ValueField from './ValueField'
import CustomButton from './CustomButton'
const CustomAccounts = () => {

    const [form, setForm] = useState({
        accountName: "",
        amount: ""
    })
  
    const [modalVisible, setModalVisible] = useState(false);  
    return (
        <View className = "w-full h-full">
                         {form.accountName !== "" && form.amount !== "" && (
  <Text className="text-white text-psemibold mt-5 px-14">{form.amount}</Text>
)}
    <View className="p-5 w-[150px] h-[200px]">


        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)} // Set modal visible when pressed
          className="bg-transparent border border-secondary p-3 rounded-xl justify-center items-center"
        >
             <FontAwesome5  name="plus" size={24} color="white" />

          <Text className="text-white font-pregular text-sm">
            Account 
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
            
              <Text className="text-gray-100 font-psemibold text-3xl mt-5">Add Account</Text>

                <ValueField 
                 placeholder="Enter Account Name"
                 value={form.accountName} // The actual value of the field
            onChangeText={(e) => setForm({ ...form, accountName: e })}
                
                
                />
                <ValueField     
                placeholder="Enter Amount" 
                value={form.amount} // The actual value of the field
                onChangeText={(e) => setForm({ ...form, amount: e })}
                
                />
                <CustomButton title="Add Account" 
                textStyles={"font-psemibold text-lg"}
                handlePress={() => console.log(form)}
                />
               
              
            
          </View>
        </Modal>

       
      </View>

      </View>
  )
}

export default CustomAccounts