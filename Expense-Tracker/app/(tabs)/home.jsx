import { View, Text, SafeAreaView, FlatList, TouchableOpacity , Modal, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import CustomAccounts from '../../components/CustomAccounts'
import useAppwrite  from '../../lib/useAppwrite'
import { getExpenses } from '../../lib/appwrite'
import HorizontalCard from '../../components/HorizontalCard'
import { addAccount } from '../../lib/appwrite'
import { RefreshControl } from 'react-native'
import { useGlobalContext } from '../../context/globalContex'
import { getAccounts , getBudgets} from '../../lib/appwrite'
import BudgetFlatlist from '../../components/BudgetFlatlist'

const home = () => {
  const {user} = useGlobalContext();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const {data:posts , loading , refetch} = useAppwrite(() => getExpenses(user.$id));
  const {data:accounts , refetch: refetchAccount} = useAppwrite(() => getAccounts(user.$id));
  const {data:budgets , refetch: refetchBudgets} = useAppwrite(() => getBudgets(user.$id));

  const [refreshing, setRefreshing] = useState(false)

  const OnRefresh = async () => { // why use async here?
    setRefreshing(true)
    await refetch()
    await refetchAccount()
    setRefreshing(false)
  }
  console.log("Expenses", posts);
  console.log(accounts);
  console.log(budgets);

  const getCurrents = new Date().getHours();

  let greeting;
  if (getCurrents >= 5 && getCurrents < 12) {
    greeting = 'Good Morning'
  }
  else if (getCurrents >= 12 && getCurrents < 17) {
  
  
    greeting = 'Good Afternoon'}
  else if (getCurrents >= 17 && getCurrents < 20) {
    greeting = 'Good Evening'
  }
  else {
    greeting = 'Good Night'
  }

  return (
    <SafeAreaView className = "bg-gray-200 h-full">


      <FlatList 
      data={posts.documents}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View className= "w-full px-5 rounded-xl">
          <TouchableOpacity>
          <View className="flex-row justify-between items-center px-6 bg-gray-80 mt-4 py-4 rounded-xl">
                <View>
                  
                  <Text className="text-white font-psemibold text-lg">{item.title}</Text>
                  <Text className="text-secondary-100 font-psemibold text-sm">{item.category}</Text>
                  
                  <Text className="text-secondary-100 font-psemibold text-sm">{new Date(item.$createdAt).toLocaleDateString('en-US', options)}</Text>
                  <Text className="text-white font-psemibold text-sm"> {item.account[0].name}</Text>
                </View>
                <View> 
                  <Text className="text-white font-psemibold text-lg">{item.cost} BDT</Text>
                </View>
              </View>
        

          </TouchableOpacity>
            
        

        </View>
      
      )}

      ListHeaderComponent={() => (
        <View className= "my-14 px-6  ">

          <View className="flex-row flex justify-between items-start ">
            <View>

            <Text className ="text-white font-psemibold text-lg">{greeting}</Text>
            <Text className ="text-white font-psemibold text-secondary-200"> {user.username}</Text>
            </View>

            <View className="mt-5 px-2">

              <Text className="text-xl text-secondary-100 font-pbold "> CashFlow</Text>
            </View>
           
            </View>

            <View className = "w-full flex-1 mt-2">
                     <Text className="text-white font-psemibold text-lg mt-3">Accounts</Text>
                      <HorizontalCard posts ={accounts.documents} refetchAccount = {refetchAccount} />
                    

                    </View>
                  
                  <View className="w-full  mt-6">
                  <Text className="text-primary-10 font-pbold text-lg mt-14">Budgets</Text>
                      <BudgetFlatlist posts={budgets.documents} refetchBudget={refetchBudgets} accounts = {accounts.documents}/>
            </View>
            

            <Text className="text-primary-0 font-psemibold text-lg ">Transactions</Text>
        </View>
      )}

     
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />}
      
      
      
      />
       

    </SafeAreaView>
  )
}

export default home