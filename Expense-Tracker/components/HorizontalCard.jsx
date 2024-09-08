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



const HorizontalCard = ({posts , refetchAccount}) => {
  
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
        <View className ="px-3 mt-4 ">
          
            <TouchableOpacity className="h-full"
            onPress={() => {
              setModalVisible(!modalVisible)
              setForm({name: item.name , amount: item.amount})
              setSelectedItem(item)
              
            }}
            
            
            >
          <View 
            style={{borderColor: item.color}}
          className="w-40 h-40 flex-1  bg-gray-80 border rounded-xl border-secondary justify-center items-center">
            <View>
              <View className="w-10 h-10 rounded-full absolute left-6 bottom-8 " 
              style={{backgroundColor: item.color}}
              
              />

            </View>
          <Text numberOfLines={1} className="text-lg font-pbold text-white top-8 absolute right-1 px-2 mt-6">{item.name}</Text>
          <Text className="text-lg font-psemibold text-primary-10 top-12 right-1 px-2 absolute mt-10">{item.amount} BDT</Text>
          </View>
          
          
         
          
          </TouchableOpacity>

          <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            
            setModalVisible(!modalVisible);
            setIsEditable(!isEditable)
          }}
          
          
          >

              <View 
               
              className="flex justify-center  
               h-full"
              style={{backgroundColor: selectedItem.color}}
              >
                <TouchableOpacity className ="absolute left-5 top-5"
                onPress={() => {
                  setModalVisible(!modalVisible)
                  setForm({name: item.name , amount: item.amount})
                  setIsEditable(false)
                  

                } 



                }
                >
                <FontAwesome5 name="arrow-left" size={20} color="white" className ="" 
                />


                </TouchableOpacity>
                <TouchableOpacity className ="absolute right-5 top-5">
                <FontAwesome5 name="trash" size={20} color="white" 
                onPress={handleDelete}
                />
                


                </TouchableOpacity>
                
                
                <TouchableOpacity className ="absolute right-12 top-5 ">
                <FontAwesome5 name={isEditable ? ("window-close") : ("edit")} size={20} color="white"  
                onPress={() => setIsEditable(!isEditable)}
                />
                


                </TouchableOpacity>
                <View className="px-5">
               
                <View className="w-full bg-gray-200  h-80 justify-center items-center  rounded-xl mt-12 ">
                    <View className=" px-9 justify-center items-center ">
                      {isEditable && (<Text className="text-lg font-pbold text-secondary-100">Edit Account</Text>)}
                    <ValueField 
                     value={form.name} 
                     placeholder={"Account Name"}  
                     otherstyles={"bg-gray-200 "} 
                     onChangeText={(e) => setForm({ ...form, name: e })}
                     editable={isEditable}
                     />
                    <ValueField  value={form.amount?.toString()} handleText={() => {}} placeholder={"Amount"} keybaordType="numeric" otherstyles={"bg-gray-200 "} 
                      onChangeText={(e) => setForm({ ...form, amount: e})}
                      editable={isEditable}
                      />
                    
                    </View>
                   
                    {/* <Text className="text-lg font-pbold text-secondary-100">{selectedItem.name}</Text>
                    <Text className="text-lg font-pbold text-secondary-200"> Account Amount : {selectedItem.amount} BDT</Text> */}
                  </View>

                  </View>
                  <View className="mt-5 px-5">
                  {
                    isEditable && (<CustomButton title={"Save Changes"}
                      containerStyles={"px-5 " }
                      textStyles={"text-black font-pbold text-lg "}
                      handlePress={handleupdate}
                      
                      />)
                   }

                  </View>
              </View>

           

          </Modal>
          
        </View>

       
      )}

    ListFooterComponent={() => (
        <View> 
        <CustomAccounts title={"Account"} header={"Add Account"} refetchAccount={refetchAccount}/>

        </View>
    )}

   
      horizontal
      showsHorizontalScrollIndicator={false}
      />

    )
}

export default HorizontalCard