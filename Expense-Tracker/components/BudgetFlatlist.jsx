import { View, Text, FlatList, Modal } from 'react-native'
import React from 'react'
import CustomBudget from './CustomBudget'
import { StyleSheet } from 'react-native';
import styles from 'react-native'
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { deleteAccount, deleteBudget } from '../lib/appwrite';
import ValueField from './ValueField';
import { updateBudget } from '../lib/appwrite';
import { getAccounts } from '../lib/appwrite';



const BudgetFlatlist = ({posts , refetchBudget , accounts} ) => {
  
  const [isEditable , setIsEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(posts);
  console.log(" BudgetFlatlist -> posts", posts)

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
      await updateBudget( form.name, amountInt, selectedItem.$id);
      refetchBudget();
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteBudget(selectedItem.$id);
      refetchBudget();
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
        <View>
          <TouchableOpacity
          onPress={() => {
            
            setModalVisible(!modalVisible)
            
            setForm({name: item.name , amount: item.amount})
            
            setSelectedItem(item)
            
          
          }}
          
          >
              <View className ="w-64 h-64 mt-5 px-3 rounded-xl" >
            <View className ="w-50 h-32 bg-gray-300 rounded-xl border justify-center"
            style={{borderColor: item.color}}
            
            >
                <Text className="text-white text-lg px-3 font-pbold" >{item.name}</Text>
                <Text className="text-secondary text-lg px-3 font-pbold" >{item.amount} BDT</Text>

            </View>
            
            
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
                <FontAwesome5 name="arrow-left" size={25} color="white" className ="" 
                />


                </TouchableOpacity>
                <TouchableOpacity className ="absolute right-5 top-5">
                <FontAwesome5 name="trash" size={25} color="white" 
                onPress={handleDelete}
                />
                


                </TouchableOpacity>
                
                
                <TouchableOpacity className ="absolute right-16 top-5 ">
                <FontAwesome5 name={isEditable ? ("window-close") : ("edit")} size={25} color="white"  
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
        <CustomBudget  title={"Budget"} header={"Add Budget"} refetchBudget={refetchBudget} accounts = {accounts}/>
    )}

   
      horizontal
      showsHorizontalScrollIndicator={false}
      />

    )
}

export default BudgetFlatlist