import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const GameRoom = () => {

    const params = useLocalSearchParams();
    const gameId = params.gameId;

    return (
        <View>
        <Text>{gameId}</Text>
        </View>
    )
}

export default GameRoom

const styles = StyleSheet.create({})