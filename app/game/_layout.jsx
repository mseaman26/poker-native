import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const GameLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='[gameId]' options={{headerShown: false}}/>
    </Stack>
  )
}

export default GameLayout

const styles = StyleSheet.create({})