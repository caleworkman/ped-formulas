import AsyncStorage from '@react-native-async-storage/async-storage';

export const readValue = async (key, setStateFunction) => {
    try {
        const value = await AsyncStorage.getItem(key);
        setStateFunction(value);
    } catch (e) {
        console.log(e)
    }
}

export const readBool = async (key, setStateFunction) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value == 'true') {
            setStateFunction(true);
        } else {
            setStateFunction(false)
        }
    } catch (e) {
        console.log(e)
    }
}