import { useEffect , useState } from "react";
import { Alert } from "react-native";
import { View, Text } from 'react-native'
import React from 'react'


const useAppwrite = (fn) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    
    
    const fetchData = async () => {
        setLoading(true)
        try {
         

          const posts = await fn();
          setData(posts)
        } catch (error) {
          Alert.alert('Error', error.message)
        }finally {
          setLoading(false)
      }
    }
  
    useEffect(() => {
        
  
      fetchData();
    
   }, [] ) 

   const refetch = () => fetchData();

      return { data , loading , refetch };
    
}

export default useAppwrite