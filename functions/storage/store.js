import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeValue = async (key, setStateFunction, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        setStateFunction(value)
    } catch (e) {
        console.log(e)
    }
}