import AsyncStorage from '@react-native-async-storage/async-storage';

import { VolumeUnit } from '../functions/formula/VolumeUnits';


export const initStorage = async () => {

    // This is clearing stuff in useEffect, don't use it

    const defaults = {
        'targetCaloriesPerOz': false,
        'waterToMixUnit': VolumeUnit.OZ,
        'waterDisplacedUnit': VolumeUnit.OZ,
        'volumeUnit': VolumeUnit.OZ
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