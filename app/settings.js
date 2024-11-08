import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import UnitSelector from '../components/unitSelector';
import { getMultiple } from '../functions/storage/read';
import { storeValue } from '../functions/storage/store.js';

import { VolumeUnit } from '../functions/formula/VolumeUnits';

export default function Settings() {

    const [targetCaloriesPerOz, setTargetCaloriesPerOz] = useState(false)
    const [waterToMixUnit, setWaterToMixUnit] = useState(VolumeUnit.ML);
    const [waterDisplacedUnit, setWaterDisplacedUnit] = useState(VolumeUnit.ML)
    const [volumeUnit, setVolumeUnit] = useState(VolumeUnit.OZ)

    useEffect(() => {
        getMultiple(['targetCaloriesPerOz', 'waterToMixUnit', 'waterDisplacedUnit', 'volumeUnit']).then(pairs => {   
            // these get returned in order
            setTargetCaloriesPerOz(pairs[0][1].toLowerCase() == 'true');
            setWaterToMixUnit(VolumeUnit.fromString(pairs[1][1]));
            setWaterDisplacedUnit(VolumeUnit.fromString(pairs[2][1]));
            setVolumeUnit(VolumeUnit.fromString(pairs[3][1]));
        })
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
                    options={[VolumeUnit.OZ, VolumeUnit.ML]}
                    onSelectOption={x => storeValue('waterToMixUnit', setWaterToMixUnit, x)}
                />
            </View>
    
            <View style={styles.item}>
                <UnitSelector
                    displayName='Water Displaced'
                    selected={waterDisplacedUnit}
                    options={[VolumeUnit.OZ, VolumeUnit.ML]}
                    onSelectOption={x => storeValue('waterDisplacedUnit', setWaterDisplacedUnit, x)}
                />
            </View>

            <View style={styles.item}>
                <UnitSelector
                    displayName='Volume'
                    selected={volumeUnit}
                    options={[VolumeUnit.OZ, VolumeUnit.ML]}
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
