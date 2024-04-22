import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { initializeSocket, getSocket } from "../../lib/socketService";
import { createUserAPI } from '../../lib/apiHelpers';
import { Link, Redirect } from 'expo-router';
import { displayLoginError, setStoredEmail, setStoredPassword } from '../../lib/authHelpers';

const SignUpScreen = () => {

  initializeSocket();
  let socket = getSocket();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loggedInUsername, setLoggedInUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSignUp = () => {
    setErrorMessage('')
    setLoading(true)
    if(!email || !password || !username){
        setErrorMessage('You must provide an email, password, and username')
        setLoading(false)
        return
        
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
    // Signed up 
      await setStoredEmail(email)
      await setStoredPassword(password)
      setLoggedIn(true)
      const user = userCredential.user;
      return user
    })
    .then(() => {
      const currentUser = auth.currentUser
      updateProfile(currentUser, {
        displayName: username, photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(async () => {
        // Profile updated!
        // ...
        setLoggedInUsername(username)
        await createUserAPI(username, email)
      }).catch((error) => {
        // An error occurred
        // ...
        
        console.log(error)
      });
    })
    .catch((error) => {
        const errorMessage = error.message;
        displayLoginError(errorMessage, setErrorMessage)
      // ..
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const handleLogOut = () => {
    setErrorMessage('')
    setLoading(true)
    signOut(auth).then(() => {
      // Sign-out successful.
      setLoggedInUsername('')
      console.log('logout successfull')
    }).catch((error) => {
      // An error happened.
      console.log(error)
      setLoggedInUsername('')
    }).finally(() => {
      setLoggedIn(false)
      setLoading(false)
    })
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
              onChangeText={text => {
                setEmail(text)
                setErrorMessage('')}}
              style={styles.input}
            />
            <TextInput
              placeholder='Password'
              value={password}
              onChangeText={text => {
                setPassword(text)
                setErrorMessage('')}}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder='Username'
              value={username}
              onChangeText={text => {
                setUsername(text)
                setErrorMessage('')}}
              style={styles.input}
            />
          </View>
          <Link href={'/login'}><Text>Already have an account? Click here to log in</Text></Link>
          <View style={styles.buttonContainer}>
            
            <TouchableOpacity 
              onPress={handleSignUp}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
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

export default SignUpScreen

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