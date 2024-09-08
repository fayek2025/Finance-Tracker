import { View, Text, FlatList, Modal } from 'react-native'
import React from 'react'
import CustomAccounts from './CustomAccounts'
import { StyleSheet } from 'react-native';
import styles from 'react-native'
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { deleteAccount } from '../lib/appwrite';
import ValueField from './ValueField';
import { updateAccount } from '../lib/appwrite';



const BudgetFlatlist = ({posts , refetchAccount}) => {
  
  const [isEditable , setIsEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(posts);


  const [form , setForm] = useState({

    name: "" ,
    amount: ""
  }
   
    
  )

  const handleupdate = async () => {
    if (!form.name || !form.amount) {
      
      return;
    }

    const amountInt = parseInt(form.amount);
    try {
      await updateAccount( form.name, amountInt, selectedItem.$id);
      refetchAccount();
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteAccount(selectedItem.$id);
      refetchAccount();
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  }


  
  return (
    <FlatList
      data={posts}
        keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
      
        <View className ="w-64 h-64 mt-5 px-3 rounded-xl" >
            <View className ="w-50 h-32 bg-gray-300 rounded-xl border justify-center"
            style={{borderColor: item.color}}
            
            >
                <Text className="text-white text-lg px-3 font-pbold" >{item.name}</Text>
                <Text className="text-white text-lg px-3 font-pbold" >{item.amount}</Text>

            </View>
            
            
            </View>
          
           

       
      )}

    ListFooterComponent={() => (
        <CustomAccounts  title={"Budget"} header={"Add Budget"}/>
    )}

   
      horizontal
      showsHorizontalScrollIndicator={false}
      />

    )
}

export default BudgetFlatlist