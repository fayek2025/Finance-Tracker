import { View, Text, ScrollView, TouchableOpacityBase } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native'
import ValueField from '../../components/ValueField'
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import { getAccounts } from '../../lib/appwrite'
import { getBudgets } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from '../../context/globalContex'
import CustomButton from '../../components/CustomButton'
import { addExpense } from '../../lib/appwrite'
import { updateAccount } from '../../lib/appwrite'
import { router } from 'expo-router'

const create = () => {

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {user} = useGlobalContext();
  const {data:accounts , refetch: refetchAccount} = useAppwrite(() => getAccounts(user.$id));
  const {data:budgets , refetch: refetchBudgets} = useAppwrite(() => getBudgets(user.$id));
  
  const [form , setForm] = useState({
    name: "" ,
    category: "",
    amount: ""
  })

  const [selectedItem, setSelectedItem] = useState(accounts);
 const [focus , setFocus] = useState(false);

  const handlePress = async () => {
    if(form.name === "" || form.amount === "" || form.category === ""){
      Alert.alert("Error" , "Please fill in all fields")
    }
    const amountAsInteger = parseFloat(form.amount);
    let accountAmount;
    parseInt(accountAmount);
    accounts.documents.forEach((item) => {
      if(item.$id === selectedItem.$id)
      {
        accountAmount = parseInt(item.amount) - amountAsInteger;
      }
    })

    if (accountAmount === undefined) {
      Alert.alert("Error", "Unable to find selected account");
      return;
    }
    if (isNaN(amountAsInteger)) {
      throw new Error("Amount must be a valid number");
  }
    try{
      await addExpense(form.name , amountAsInteger , form.category , selectedItem.$id , user.$id);
      await updateAccount(selectedItem.name , accountAmount , selectedItem.$id);
      refetchAccount();
      setFocus(false);
      setForm({
        name: "" ,
        category: "",
        amount: ""
      })
      router.replace('/home');
    }catch (error){
      console.error(error);
    }
  }


  
  return (
    <SafeAreaView className = "bg-gray-200 h-full ">
            
                    <FlatList 
                    data={accounts.documents}
                    keyExtractor={(item) => item.$id}

                    renderItem={({item}) => (
                      <View className="flex-row flex flex-wrap justify-content items-center px-6">
                        <View className ={`flex-row bg-gray-60 mt-6  `} >
                       
                        <TouchableOpacity
                      onPress={() => {
                        setSelectedItem(item)
                        setFocus(!focus)

                      }}

                      className ={`focus:outline-none ${focus && selectedItem === item ? 'border-0.5 border-white' : ''} px-5` }
                      >
                              <View className="px-3 mt-1 flex-row flex">
                                <View>
                                <Text className="text-white font-pbold "> {item.name}</Text>
                                </View>
                                
                         
                        </View>
                      </TouchableOpacity>
                        </View>
                          

                      {/* <Text className="text-white"> {selectedItem.$id}</Text> */}
                      </View>
                      
                    
                    )}
                    

                      ListHeaderComponent={
                        <View className="flex justify-center px-5 mt-7 ">
                            <Text className="text-lg font-pbold text-secondary-100">Create Transaction</Text>

                            <ValueField  placeholder={"Name"}
                            value={form.name}
                            onChangeText={(e) => setForm({...form , name: e})}

                            
                            />
                             <ValueField  placeholder={"Amount"}
                             value = {form.amount}
                              onChangeText={(e) => setForm({...form , amount: e})}
                              keybaordType="numeric"
                             
                             
                             />
                            <ValueField  placeholder={"Category"}
                            value = {form.category}
                            onChangeText={(e) => setForm({...form , category: e})}
                            />

                           


                            
                                  <View className ="mt-5" >
                                    <Text className = "text-white font-semibold"> Select Bank</Text>
                                  </View>
                                  
                           
                        </View>
                        

                      }

                      ListFooterComponent={
                        <View className="px-4">
                          <CustomButton title={"Create"} textStyles={"font-pbold"}
                          
                          handlePress={handlePress}/>
                        </View>
                      }
                    />
                    


            

    </SafeAreaView>
  )
}

export default create