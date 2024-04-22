import * as SecureStore from 'expo-secure-store';

const setToken = async (token) => {
    await SecureStore.setItemAsync('token', token);
}
const setStoredEmail = async (username) => {
    await SecureStore.setItemAsync('username', username);
}
const setStoredPassword = async (password) => {
    await SecureStore.setItemAsync('password', password);
}


const getToken = async () => {
    return await SecureStore.getItemAsync('token');
}
const getStoredEmail = async () => {
    return await SecureStore.getItemAsync('username');
}
const getStoredPassword = async () => {
    return await SecureStore.getItemAsync('password');
}

const deleteToken = async () => {
    await SecureStore.deleteItemAsync('token');
}
const deleteStoredEmail = async () => {
    await SecureStore.deleteItemAsync('username');
}
const deleteStoredPassword = async () => {
    await SecureStore.deleteItemAsync('password');

}
const displayLoginError = (errorMessage, cb) => {

    if(errorMessage === 'Firebase: Error (auth/invalid-email).'){
        cb('You must provide a valid email address')
    }else if(errorMessage === 'Firebase: Error (auth/missing-password).'){
        cb('You must provide a password')
    }else if(errorMessage === 'Firebase: Error (auth/invalid-credential).'){
        cb('Invalid email or password')
    }else if (errorMessage === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
        cb('Your password must be at least 6 characters long')
    }else if(errorMessage === 'Firebase: Error (auth/email-already-in-use).'){
        cb('An account with the provided email already exists')
    }
}

export { setToken, setStoredEmail, setStoredPassword, getToken, getStoredEmail, getStoredPassword, deleteToken, deleteStoredEmail, deleteStoredPassword, displayLoginError};



