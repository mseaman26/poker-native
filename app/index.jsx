import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const HomeScreen = () => {
  return (
    <View style={styles.conainer}>
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