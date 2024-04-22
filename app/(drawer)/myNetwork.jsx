import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const myNetwork = () => {

    useEffect(() => {
        confirm('myNetwork')
    }), []
    return (
        <View>
        <Text>myNetwork</Text>
        </View>
    )
}

export default myNetwork

const styles = StyleSheet.create({})