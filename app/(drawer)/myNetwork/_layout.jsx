import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const NetworkLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='myNetwork' options={{headerShown: false}}/>
    </Stack>
  )
}

export default NetworkLayout

const styles = StyleSheet.create({})