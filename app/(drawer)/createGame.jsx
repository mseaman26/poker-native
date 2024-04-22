import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Link } from 'expo-router'

const createGame = () => {

    const enterGame = () => {
        confirm('enterGame')
    

    }

    return (
        <SafeAreaView>
        <Text>createGame</Text>
        <Link href={{pathname: '/game/2', params: {gameId: 2}}}><Text>Enter Game</Text></Link>
        </SafeAreaView>
    )
}

export default createGame

const styles = StyleSheet.create({})