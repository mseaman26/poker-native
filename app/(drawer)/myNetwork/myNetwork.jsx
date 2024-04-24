import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { globalStyles } from '../../../globalStyles'

const MyNetwork = () => {

    useEffect(() => {

    }), []
    return (
        <View style={styles.searchContainer}>
            <Text>testtest bleasedf</Text>
        </View>
    )
}

export default MyNetwork

let styles = StyleSheet.create({
    searchContainer: {
        position: 'relative',
        backgroundColor: 'blue',
        height: '33%',
        width: '100%%'
    }
})