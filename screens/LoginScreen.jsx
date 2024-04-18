import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from '../firebaseConfig';

const LoginScreen = () => {

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
        console.log('logout successfull')
      }).catch((error) => {
        // An error happened.
        console.log(error)
        setLoggedInUsername('')
      });
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
    
      // Cleanup function to unsubscribe from onAuthStateChanged
      return () => unsubscribe();
    }, [])

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
              <TextInput
                placeholder='Username'
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                onPress={handleLogin}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
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
      borderWidth: 'none',
      color: 'white'
    }
  })