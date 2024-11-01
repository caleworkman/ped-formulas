import AsyncStorage from '@react-native-async-storage/async-storage';

export const initStorage = async () => {

    const defaults = {
        'targetCaloriesPerOz': false,
        'waterToMixUnit': 'oz',
        'waterDisplacedUnit': 'oz',
        'volumeUnit': 'oz'
    }

    const currentKeys = AsyncStorage.getAllKeys();
    const toSet = [];

    Object.keys(defaults).map(key => {
        if (!(key in currentKeys)) {
            toSet.push([key, defaults[key]])
        }
    })

    try {
        await AsyncStorage.multiSet(toSet);
    } catch (e) {
        console.log(e)
    }
}