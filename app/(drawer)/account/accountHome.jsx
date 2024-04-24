import { StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../globalStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { auth } from '../../../firebaseConfig'
import { signOut} from 'firebase/auth'
import {deleteUserAPI} from '../../../lib/apiHelpers'
import { router } from 'expo-router'

const Account = () => {

  const handleDeleteAccount = async() => {
    //delet user from database
    await deleteUserAPI(auth.currentUser.uid)
    // sign out user
    //delete user from auth
    await auth.currentUser.delete()
    router.replace('/login')
  }

  return (
    <View>
      <Text>Logged in as: {auth.currentUser.displayName} </Text>
      <Text>account</Text>
      <TouchableOpacity style={[globalStyles.g_button, globalStyles.g_redButton]} onPress={handleDeleteAccount}><Text style= {globalStyles.g_redButton}>Delete Account sdfsdf   </Text></TouchableOpacity>
      <View style={styles}>

      </View>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({})