import { StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../globalStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { auth } from '../../../firebaseConfig'
import { signOut} from 'firebase/auth'
import {deleteUserAPI} from '../../../lib/apiHelpers'

const account = () => {

  const handleDeleteAccount = async() => {
    //delet user from database
    await deleteUserAPI(auth.currentUser.uid)
    // sign out user
    //delete user from auth
    auth.currentUser.delete()

  }

  return (
    <View>
      <Text>Logged in as: {auth.currentUser.displayName} </Text>
      <Text>account</Text>
      <TouchableOpacity style={[globalStyles.g_button, globalStyles.g_redButton]} onPress={handleDeleteAccount}><Text style= {globalStyles.g_redButton}>Delete Account</Text></TouchableOpacity>
    </View>
  )
}

export default account

const styles = StyleSheet.create({})