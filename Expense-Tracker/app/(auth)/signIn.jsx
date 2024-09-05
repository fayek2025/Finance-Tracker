import { View, Text, SafeAreaView, ScrollView , Image} from 'react-native'
import React, { useState } from 'react'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'
import { Alert } from 'react-native'
import { getUsers, login } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalContex'

const signIn = () => {

  const {setUser , setLogged} = useGlobalContext();

  const [submiting , setSubmiting] = useState(false);
  const [form , setForm] = useState({
    email: "",
    password: ""
  })

        const submit = async () => {
          if(form.email === "" || form.password === ""){
            Alert.alert("Error" , "Please fill in all fields")
          }

            setSubmiting(true)
            try{
             await login(form.email , form.password);
             const user = await getUsers();
              setUser(user);
              setLogged(true);
              router.replace('/home');


            }catch (error){

              console.error(error)

            }finally{
              setSubmiting(false)}


        }
            


  return (
    <SafeAreaView className = "bg-gray-200 h-full">
          <ScrollView contentContainerStyle ={{height: "100%"}}>
          <View className ="w-full justify-center min-h-[85vh] px-6">


            <Text className="text-gray-100 font-psemibold text-2xl">Login To {''} 
            <Text className="text-secondary-100"> CashFlow</Text>



            </Text>

            <FormField    
            title="Email" 
            placeholder="Enter your email" 
            value={form.email}
            handleText={(e) => setForm({...form , email: e})}
            

            />

              <FormField 
              title="Password" 
              placeholder="Enter your password"
              value={form.password}
              handleText={(e) => setForm({...form , password: e})}
              otherstyles="" 
            />

            <CustomButton title={"Sign in"} 
            handlePress={submit}
            textStyles={"font-pbold text-lg text-black"}
            containerStyles={"mt-10"}
            isLoading={submiting}
            
            />

            <View className="flex flex-row justify-center items-center mt-5">
                <Text className="text-gray-100 font-pmedium">Don't have an account? {''}
                  
                  <Link href={"/signUp"} className="text-secondary-100">Sign Up</Link>
                  
                  
                   </Text>



              </View>
          </View>
        
        </ScrollView>
      </SafeAreaView>
  )
}


export default signIn