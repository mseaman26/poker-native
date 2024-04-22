import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {  signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { setToken, setStoredEmail, setStoredPassword, getToken, deleteToken, deleteStoredEmail, deleteStoredPassword, displayLoginError } from '../../lib/authHelpers';
import { initializeSocket, getSocket } from "../../lib/socketService";
import { Link, Redirect } from 'expo-router';

const LoginScreen = () => {

  initializeSocket();
  let socket = getSocket();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loggedInUsername, setLoggedInUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async() => {
    setErrorMessage('')
    setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          const token = await user.getIdToken()
          await setStoredEmail(user.email)
          await setStoredPassword(password)
          try {
            await setToken(token)
            console.log('Token stored successfully');
          } catch (error) {
            console.error('Failed to store token:', error);
          }
          setLoggedIn(true)
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('error message outside func: ',  errorMessage)
        setLoading(false)
        displayLoginError(errorMessage, setErrorMessage)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const handleLogOut = async() => {
    setErrorMessage('')
    signOut(auth).then(async() => {
      // Sign-out successful.
      setLoggedInUsername('')
      console.log('logout successfull')
      deleteToken()
      await deleteStoredEmail()
      await deleteStoredPassword()
    }).catch((error) => {
      // An error happened.
      console.log(error)
      setLoggedInUsername('')
    });
  }
  const testSocket = () => {
    socket.emit('test', {})
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log('User is signed out');
      } else {
        if (user.email) {
          // User is signed in
          console.log('User is signed in');
          const uid = user.uid;
          setLoggedInUsername(user.displayName)
  
          // ...
        } else {
          // User is signed in, but email is not available
          console.log('User is signed in, but email is not available');
        }
        // User is signed out
        
      }
    });
    socket.on('test', () => {
      console.log('recieved test in react native')
    })
    // Cleanup function to unsubscribe from onAuthStateChanged
    return () => unsubscribe();
  }, [])
  useEffect(() => {
    setErrorMessage('')
  }, [email, password])
  useEffect(() => {
    console.log('loggedIn', loggedIn)
    console.log('loading', loading)
  }, [loggedIn, loading])

  // RETURN
  if(!loading && loggedIn) {
    return <Redirect href={'/'}/>
  }
  return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      > 
        <View style={styles.nav}>
          <Text>User: {loggedInUsername}</Text>
        </View>
        <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Email'
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder='Password'
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
            <Link href={'/signup'}><Text>Dont have an account? Click here to register a new account</Text></Link>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={handleLogin}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleLogOut}
              style={[styles.button, styles.buttonOutline, styles.signOutButton]}
            >
              <Text style={[styles.buttonOutlineText, styles.signOutButton]}>Signout</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={testSocket}
              style={[styles.button, styles.buttonOutline, styles.testSocketButton]}
            >
              <Text style={[styles.buttonOutlineText, styles.testSocketButton]}>Test Socket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    nav: {
      paddingTop: 100
    },
    main:{
      width: '100%',
      height: '100%',
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    errorMessageContainer:{
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50
  },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center'
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2
    },
    buttonText: {
      color: 'white',
      fontWeight: 700,
      fontSize: 16
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: 700,
      fontSize: 16
    },
    signOutButton: {
      backgroundColor: 'red',
      borderWidth: 0,
      color: 'white'
    },
    testSocketButton: {
      backgroundColor: 'green',
      borderWidth: 0,
      color: 'white'
    }
  })