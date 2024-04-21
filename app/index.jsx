import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'expo-router'
import { auth } from '../firebaseConfig'
import { getToken, getStoredEmail, getStoredPassword } from '../lib/authHelpers'
import { signInWithCustomToken } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'

const HomeScreen = () => {

  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const getUserLogin = async () => {
      const storedEmail = await getStoredEmail()
      const storedPassword = await getStoredPassword()
      if(storedEmail && storedPassword) {
        signInWithEmailAndPassword(auth, storedEmail, storedPassword)
        .then((userCredential) => {
          // Signed in 
          console.log('user: ', userCredential.user)
          setLoggedIn(true)
          // ...

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error)
        })
        .finally(() => {
          console.log('finally')
          setLoading(false)
        })
      }else {
        console.log('no email or password found')
        setLoading(false)
        return <Redirect href={'/login'}/>

        
      }
     
    }
    getUserLogin()
    getToken().then(token => {
      if(token) {
        console.log('token found')
        console.log('toket: ', token)

        
      } else {
        console.log('no token found')

      }
    })
  }, [])
  if(!loading && !loggedIn) {
    return <Redirect href={'/login'}/>
  }
  return (
    <View style={styles.conainer}>
      {loading && 
        <Text>Loading ...</Text>}
      <Text>Home Screen</Text>
      <Link href={'/login'}>Log In</Link>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})