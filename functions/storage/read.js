import AsyncStorage from '@react-native-async-storage/async-storage';

export const readValue = async (key, initialValue) => {
    try {
        const value = await AsyncStorage.getItem(key) ?? initialValue;
        return value;
    } catch (e) {
        console.log(e)
    }
}

export const readBool = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value.toLowerCase() == 'true';
    } catch (e) {
        console.log(e)
    }
}
