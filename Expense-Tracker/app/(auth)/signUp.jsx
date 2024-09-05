import { View, Text ,SafeAreaView , ScrollView } from 'react-native'
import React from 'react'
import { useState } from 'react'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router' 
import { Alert } from 'react-native'
import { createUser } from '../../lib/appwrite'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/globalContex'
const signUp = () => {
  const [submiting , setSubmiting] = useState(false);
  const {setUser , setLogged} = useGlobalContext();

  const [form , setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

      const submit = async () =>{

        if(!form.email || !form.username || !form.password)
        {
          Alert.alert("Error", "Need to fill up all the requirements!");
        }

        try{

            const result = await createUser(form.username , form.email , form.password);
            setUser(result);
            setLogged(true);

            router.replace('/home');
            

        }catch (error){
          console.error(error)
          
        }finally{
          setSubmiting(false)
        }

      }

  return ( 
    <SafeAreaView className = "bg-gray-200 h-full ">
          <ScrollView contentContainerStyle ={{height: "100%"}}>
          <View className ="w-full justify-center min-h-[85vh] px-6 mt-10">


            <Text className="text-gray-100 font-psemibold text-2xl">Sign Up to {''} 
            <Text className="text-secondary-100"> CashFlow</Text>



            </Text>

            <FormField    
            title="Username" 
            placeholder="Enter your Username" 
            value={form.username}
            handleText={(e) => setForm({...form , username: e})}/>

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

            <CustomButton title={"Sign up"} 
            handlePress={submit}
            textStyles={"font-pbold text-lg text-black"}
            containerStyles={"mt-10"}
            isLoading={submiting}
            
            />

            <View className="flex flex-row justify-center items-center mt-5">
                <Text className="text-gray-100 font-pmedium">Already have an account? {''}
                  
                  <Link href={"/signIn"} className="text-secondary-100">Sign In</Link>
                  
                  
                   </Text>



              </View>
          </View>
        
        </ScrollView>
      </SafeAreaView>
  )
}

export default signUp