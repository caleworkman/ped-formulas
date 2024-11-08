import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMultiple = async (keys: Array<string>) => {
    let values;
    try {
        values = await AsyncStorage.multiGet(keys);
        return values;
    } catch(e) {
        console.error(e);
    }
}