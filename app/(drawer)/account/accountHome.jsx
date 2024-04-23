import { StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../globalStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { auth } from '../../../firebaseConfig'

const account = () => {

  const handleDeleteAccount = () => {
    
  }

  return (
    <View>
      <Text>Logged in as: {auth.currentUser.displayName} </Text>
      <Text>account</Text>
      <TouchableOpacity style={[globalStyles.g_button, globalStyles.g_redButton]}><Text style= {globalStyles.g_redButton}>Delete Account</Text></TouchableOpacity>
    </View>
  )
}

export default account

const styles = StyleSheet.create({})