import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, ID , Databases , Avatars , Query} from 'react-native-appwrite';
import React, { useState } from 'react';


export const appwriteConfig = {
    endpoint : 'https://cloud.appwrite.io/v1',
    projectId : '66d92e320032c13a1bd6',
    plaformId : 'com.fayek.cashflow',
    databaseId : '66d92f23001cd89377f9',
    userCollectionId : '66d92f4c002396cd313a',
    expenseCollectionId : '66d9d66c0034125778a4',
    accountCollectionId : '66dabbac00037701f81c',
    budgetCollectionId : '66dd7dc40007b3ba3ca4'
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
       const randomString = Math.random().toString(36).substring(2, 15);
        const userId = `${username.replace(/[^a-zA-Z0-9.-_]/g, "").toLowerCase()}_${randomString}`
        if(!newAccount) throw new Error("Account not found");

        const AvatarUrl = avatars.getInitials(username);
        await login(email , password);
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId,
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


export const addExpense = async (title , cost , category , accountId , userId) => {
    try {
        const newExpense = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.expenseCollectionId,
            ID.unique(),
            {
                title , 
                cost,

                category,
                account : accountId,
                user : userId
            }
           
        );


        if(!newExpense) throw new Error("Expense not found");
        return newExpense;
    } catch (error) {
        console.error(error);
    }
}

//Getting expense documents from the database
export const getExpenses = async (userId) => {
    try {
        const expenses = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.expenseCollectionId,
          
            [Query.equal("user", userId)]
        );
        if(!expenses) throw new Error("Expenses not found");
        return expenses;
    } catch (error) {
        console.error(error);
    }
}



//Getting account documents from the database


export const getAccounts = async (userId) => {
    try {
        const accounts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.accountCollectionId,

            [Query.equal("user", userId)]
            
        );


       
        if(!accounts) throw new Error("Accounts not found");
        return accounts;
    }catch (error) {
        console.error(error);
    }
}


export const addAccount = async (name, amount , user , color) => {
    try {
        const newAccount = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.accountCollectionId,
            ID.unique(),
           {
                name,
                amount,
                color,
                user
           }
        );

        
        if(!newAccount) throw new Error("Account not found");
        return newAccount;
    } catch (error) {
        console.error(error);
    }
}   


export const deleteAccount = async (accountId) => {
    try {
        const deletedAccount = await database.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.accountCollectionId,
            accountId
            
        );
        if(!deletedAccount) throw new Error("Account not found");
        return deletedAccount;
    } catch (error) {
        console.error(error);
    }
}


export const updateAccount = async (name  , amount ,accountId) => {
    try {
        const deletedAccount = await database.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.accountCollectionId,
            accountId,

            {name,
            amount
            
            }
        );
        if(!deletedAccount) throw new Error("Account not found");
        return deletedAccount;
    } catch (error) {
        console.error(error);
    }
}


//Budgets

export const getBudgets = async (userId) => {
    try {
        const accounts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.budgetCollectionId,

            [Query.equal("user", userId)]
            
        );
        if(!accounts) throw new Error("Accounts not found");
        return accounts;
    }catch (error) {
        console.error(error);
    }
}



export const addBudgets = async (name, amount , user , color) => {
    try {
        const newAccount = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.budgetCollectionId,
            ID.unique(),
           {
                name,
                amount,
                color,
                user
           }
        );

        
        if(!newAccount) throw new Error("Account not found");
        return newAccount;
    } catch (error) {
        console.error(error);
    }
}


export const deleteBudget = async (accountId) => {
    try {
        const deletedAccount = await database.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.budgetCollectionId,
            accountId
            
        );
        if(!deletedAccount) throw new Error("Account not found");
        return deletedAccount;
    } catch (error) {
        console.error(error);
    }
}


export const updateBudget = async (name  , amount ,accountId) => {  
    try {
        const deletedAccount = await database.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.budgetCollectionId,
            accountId,

            {name,
            amount
            
            }
        );
        if(!deletedAccount) throw new Error("Account not found");
        return deletedAccount;
    } catch (error) {
        console.error(error);
    }
}


//add expense

