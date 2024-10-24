import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import UnitSelector from '../components/unitSelector';
import { readBool, readValue } from '../functions/storage/read.js';
import { storeValue } from '../functions/storage/store.js';

export default function Settings() {

    const [targetCaloriesPerOz, setTargetCaloriesPerOz] = useState(false)
    const [waterToMixUnit, setWaterToMixUnit] = useState('mL');
    const [waterDisplacedUnit, setWaterDisplacedUnit] = useState('mL')
    const [volumeUnit, setVolumeUnit] = useState('oz')

    useEffect(() => {
        readBool('targetCaloriesPerOz', setTargetCaloriesPerOz);
        readValue('waterToMixUnit', setWaterToMixUnit);
        readValue('waterDisplacedUnit', setWaterDisplacedUnit);
        readValue('volumeUnit', setVolumeUnit);
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.item}>
                <UnitSelector
                    displayName='Target Calories'
                    selected={targetCaloriesPerOz ? 'Use Per Oz' : ''}
                    options={['Use Per Oz']}
                    onSelectOption={() => storeValue('targetCaloriesPerOz', setTargetCaloriesPerOz, !targetCaloriesPerOz)}
                />
            </View>

            <View style={styles.item}>
                <UnitSelector
                    displayName='Water to Mix'
                    selected={waterToMixUnit}
                    options={['oz', 'mL']}
                    onSelectOption={x => storeValue('waterToMixUnit', setWaterToMixUnit, x)}
                />
            </View>
    
            <View style={styles.item}>
                <UnitSelector
                    displayName='Water Displaced'
                    selected={waterDisplacedUnit}
                    options={['oz', 'mL']}
                    onSelectOption={x => storeValue('waterDisplacedUnit', setWaterDisplacedUnit, x)}
                />
            </View>

            <View style={styles.item}>
                <UnitSelector
                    displayName='Volume'
                    selected={volumeUnit}
                    options={['oz', 'mL']}
                    onSelectOption={x => storeValue('volumeUnit', setVolumeUnit, x)}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
    },
    item: {
        display: 'flex',
        paddingTop: '10px',
        width: '230px'
    }
});
