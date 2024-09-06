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
import { getAccounts } from '../../lib/appwrite'
const home = () => {
  const {user} = useGlobalContext();

  const {data:posts , loading , refetch} = useAppwrite(() => getExpenses(user.$id));
  const {data:accounts , refetch: refetchAccount} = useAppwrite(() => getAccounts(user.$id));

  const [refreshing, setRefreshing] = useState(false)

  const OnRefresh = async () => { // why use async here?
    setRefreshing(true)
    await refetch()
    await refetchAccount()
    setRefreshing(false)
  }
  console.log(accounts);

  return (
    <SafeAreaView className = "bg-gray-200 h-full">


      <FlatList 
      data={posts.documents}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View>
            <Text className= "text-white text-lg px-3 font-pbold" >{item.title}</Text>
            <Text className= "text-white text-lg px-3 font-pbold" >{item.user.username}</Text>
        
        

        </View>
      
      )}

      ListHeaderComponent={() => (
        <View className= "my-10 px-6 space-y-2 ">

          <View className="flex-row flex justify-between items-start">
            <View>

            <Text className ="text-white font-psemibold text-lg">Welcome</Text>
            <Text className ="text-white font-psemibold text-secondary-200"> {user.username}</Text>
            </View>

            <View className="mt-5 px-2">

              <Text className="text-xl text-secondary-100 font-pbold "> CashFlow</Text>
            </View>
           
            </View>

            <View className = "w-full flex-1">
                     
                      <HorizontalCard posts ={accounts.documents}/>
                      

                    </View>
            
            
        </View>
      )}

     
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />}
      
      
      
      />
       

    </SafeAreaView>
  )
}

export default home