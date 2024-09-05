import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, ID , Databases , Avatars , Query} from 'react-native-appwrite';
import React, { useState } from 'react';


export const appwriteConfig = {
    endpoint : 'https://cloud.appwrite.io/v1',
    projectId : '66d92e320032c13a1bd6',
    plaformId : 'com.fayek.cashflow',
    databaseId : '66d92f23001cd89377f9',
    userCollectionId : '66d92f4c002396cd313a'
}



 const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.plaformId);

const account = new Account(client);
const database = new Databases(client);
const avatars = new Avatars(client);



export const createUser = async (username , email , password) => {
    try {
        const newAccount = await account.create(ID.unique() , email, password, username);
        console.log(ID.unique());
        if(!newAccount) throw new Error("Account not found");

        const AvatarUrl = avatars.getInitials(username);
        await login(email , password);
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId : newAccount.$id,
                username,
                email,
                avatar: AvatarUrl
            }

            
        )
        
        console.log("Success!");
        return newUser;
       
    } catch (error) {
        console.error(error);
    }
}




export const login = async (email , password) => {
    try {
        const newSession = await account.createEmailPasswordSession(email, password);
        if(!newSession) throw new Error("Session not found");
        return newSession;
    } catch (error) {
        console.error(error);
    }
}






export const getUsers = async () => {   

    try {
        const currentAccount = await account.get();
        if(!currentAccount ) throw Error;

        const currentUser = await database.listDocuments( appwriteConfig.databaseId,    
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)],
        
        );

        if(!currentUser) throw Error;
        return currentUser.documents[0];
    }
    catch (error) {
        throw new Error(error);
    }


 }