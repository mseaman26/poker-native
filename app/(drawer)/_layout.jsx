import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  'react-native-gesture-handler'
import {Drawer} from 'expo-router/drawer'
import { Stack } from 'expo-router'
import { GestureHandlerRootView} from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-gesture-handler'




const DrawerLayout = () => {
  return (
    <>
    <GestureHandlerRootView style= {{flex: 1}} >
        <Drawer screenOptions={{title: ''}} >
            <Drawer.Screen name="index" options={{title: 'Home'}} /> 
            <Drawer.Screen name="createGame" options={{title: 'Create Game'}}/> 
            <Drawer.Screen name="account" options={{title: 'Account'}}/>
            <Drawer.Screen name="myNetwork" options={{title: 'My Network'}}/>
            <Drawer.Screen name="logout" options={{title: 'Log Out'}}/>
            
        </Drawer>
    </GestureHandlerRootView>
    </>
    
  )
}

export default DrawerLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    }
})