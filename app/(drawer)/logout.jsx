import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth } from '../../firebaseConfig'
import { deleteStoredEmail , deleteStoredPassword} from '../../lib/authHelpers'
import { Redirect } from 'expo-router'


const logout = () => {

    const [loggedOut, setLoggedOut] = useState(false)
    useEffect(() => {
        auth.signOut()
        .then(async() => {
            await deleteStoredEmail()
            await deleteStoredPassword()
            setLoggedOut(true)
        })
    })
    if(loggedOut) {
        return (
            <Redirect href='(auth)/login'/>
        )
    }
    return (
        <></>
    )
}

export default logout

const styles = StyleSheet.create({})