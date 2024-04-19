import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { initializeSocket, getSocket } from "../../lib/socketService";
import { Link } from 'expo-router';

const LoginScreen = () => {

  initializeSocket();
  let socket = getSocket();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loggedInUsername, setLoggedInUsername] = useState('')

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed up 
      const user = userCredential.user;
      return user
    })
    .then(() => {
      const currentUser = auth.currentUser
      updateProfile(currentUser, {
        displayName: username, photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        // Profile updated!
        // ...
        setLoggedInUsername(username)
        console.log('profile updated')
      }).catch((error) => {
        // An error occurred
        // ...
        console.log(error)
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error)
      // ..
    });
  }
  const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error)
      });
  }
  const handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setLoggedInUsername('')
      console.log('logout successfull')
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
          const uid = user.uid;
          console.log('User email:', user);
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
    console.log(auth)
  }, [auth])

  // RETURN

  return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      > 
        <View style={styles.nav}>
          <Text>User: {loggedInUsername}</Text>
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
            <Link href={'/signup'}><Text>Click here to register a new account</Text></Link>
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