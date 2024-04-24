import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'expo-router'
import { auth } from '../../firebaseConfig'
import {  getStoredEmail, getStoredPassword, deleteStoredEmail, deleteStoredPassword } from '../../lib/authHelpers'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { globalStyles } from '../../globalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'


const HomeScreen = () => {

  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null);

  const handleSignOut = async () => {
    await deleteStoredEmail()
    await deleteStoredPassword()
    await signOut(auth)
    
  }
  const navigateToTestPage = () => {
    router.push('testPage')
  }

  useEffect(() => {

    // getUserLogin()
    if(auth.currentUser) {
      setLoggedIn(true)
      setUser(auth.currentUser.displayName)
      setLoading(false)
    }
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        console.log("full user obj: ",user)
        console.log('auth changed: ', user.displayName)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setLoggedIn(true)
        setUser(user.displayName)
        setLoading(false)
        // ...
      } else {
        console.log('auth changed: user signed out')
        // User is signed out
        setLoading(false)

      }
    });

  }, [])
  if(!loading && !loggedIn) {
    console.log('redirecting')
    return <Redirect href={'/login'}/>
  }
  return (
    <SafeAreaView style={styles.conainer}>
      {loading && 
        <Text>Loading ...</Text>}
      <Text>Home Screen</Text>
      <Text>Welcome {user}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignOut} style={[ styles.button, styles.redButton]}><Text style={styles.buttonText}>Sign Out</Text></TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={navigateToTestPage} style={[ styles.button, globalStyles.greenButton]}><Text style={styles.buttonText}>To Test Page</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: globalStyles.g_buttonContainer,
  buttonText: globalStyles.g_buttonText,
  buttonOutline: globalStyles.g_buttonOutline,
  button: globalStyles.g_button,
  redButton: globalStyles.g_redButton
  
})