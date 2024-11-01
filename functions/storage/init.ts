import AsyncStorage from '@react-native-async-storage/async-storage';

export const initStorage = async () => {

    // This is clearing stuff in useEffect, don't use it

    const defaults = {
        'targetCaloriesPerOz': false,
        'waterToMixUnit': 'oz',
        'waterDisplacedUnit': 'oz',
        'volumeUnit': 'oz'
    }

    try {
        const currentKeys = await AsyncStorage.getAllKeys();
        const toSet = [];
    
        Object.keys(defaults).map(key => {
            if (!(key in currentKeys)) {
                toSet.push([key, defaults[key]])
            }
        })

        try {
            await AsyncStorage.multiSet(toSet);
        } catch (e) {
            console.log(e);
        }
    } catch (e) {
        console.log(e);
    }
}