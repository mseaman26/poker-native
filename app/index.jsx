import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'expo-router'
import { auth } from '../firebaseConfig'
import {  getStoredEmail, getStoredPassword, getToken } from '../lib/authHelpers'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithCustomToken } from 'firebase/auth'
import { globalStyles } from '../globalStyles'


const HomeScreen = () => {

  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null);

  useEffect(() => {

    const getUserLogin = async () => {
      setLoading(true)
      // const auth = getAuth();

      // const unsubscribe = onAuthStateChanged(auth, (user) => {
      //   setUser(user);
      //   setLoading(false);
      // });
  
      // return () => unsubscribe();
      // try {
      //   const token = await getToken();
      //   if (token) {
      //     console.log('Token retrieved successfully:');
      //     await signInWithCustomToken(token);
      //     console.log('Authenticated successfully with token');
      //     setLoggedIn(true)
      //   } else {
      //     console.log('Token not found');
      //     return null;
      //   }
        
      // } catch (error) {
      //   console.error('Error retreiving token token:', error);
      //   return null;
      // }finally {
      //   setLoading(false)
      // }
      const storedEmail = await getStoredEmail()
      const storedPassword = await getStoredPassword()
      if(storedEmail && storedPassword) {
        signInWithEmailAndPassword(auth, storedEmail, storedPassword)
        .then((userCredential) => {
          // Signed in 
          console.log('signed in onreload')
          setLoggedIn(true)
          setUser(userCredential.user.displayName)
          // ...

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
      }else {
        setLoading(false)
      }
     
    }
    getUserLogin()
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        console.log('auth changed: ', user.displayName)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const token = await user.getIdToken()
        setLoggedIn(true)
        setUser(user.displayName)
        setLoading(false)
        // ...
      } else {
        console.log('auth changed: user signed out')
        // User is signed out

        setLoggedIn(false)
      }
    });

  }, [])
  useEffect(() => {
    console.log('user: ', user)
  }, [user])
  if(!loading && !loggedIn) {
    console.log('redirecting')
    return <Redirect href={'/login'}/>
  }
  return (
    <View style={styles.conainer}>
      {loading && 
        <Text>Loading ...</Text>}
      <Text>Home Screen</Text>
      <Text>Welcome {user}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => signOut(auth)} style={[ styles.button, styles.redButton]}><Text style={styles.buttonText}>Sign Out</Text></TouchableOpacity>
      </View>
    </View>
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