import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Stack } from 'expo-router'
import { auth } from '../firebaseConfig'



const RootLayout = () => {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
    
    
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }}/>
    </Stack>
    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})