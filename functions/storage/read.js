import AsyncStorage from '@react-native-async-storage/async-storage';

export const readValue = async (key, setStateFunction, initialValue) => {
    try {
        const value = await AsyncStorage.getItem(key) ?? initialValue;
        setStateFunction(value);
    } catch (e) {
        console.log(e)
    }
}

export const readNumber = async (key, setStateFunction) => {
    try {
        const value = await AsyncStorage.getItem(key) ?? 0;
        setStateFunction(parseFloat(value));
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
