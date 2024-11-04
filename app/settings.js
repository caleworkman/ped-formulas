import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import UnitSelector from '../components/unitSelector';
import { readBool, readValue } from '../functions/storage/read.js';
import { storeValue } from '../functions/storage/store.js';

import { VolumeUnit } from '../functions/formula/VolumeUnits';

export default function Settings() {

    const [targetCaloriesPerOz, setTargetCaloriesPerOz] = useState(false)
    const [waterToMixUnit, setWaterToMixUnit] = useState(VolumeUnit.ML);
    const [waterDisplacedUnit, setWaterDisplacedUnit] = useState(VolumeUnit.ML)
    const [volumeUnit, setVolumeUnit] = useState(VolumeUnit.OZ)

    useEffect(() => {
        readBool('targetCaloriesPerOz').then(result => {
            setTargetCaloriesPerOz(result);
        });

        readValue('waterToMixUnit', setWaterToMixUnit, VolumeUnit.OZ).then(unit => {
            if (unit.toLowerCase() == 'oz') {
                setWaterToMixUnit(VolumeUnit.OZ);
            } else if (unit.toLowerCase() == 'ml') {
                setWaterToMixUnit(VolumeUnit.ML);
            }
        });

        readValue('waterDisplacedUnit', setWaterDisplacedUnit, VolumeUnit.OZ).then(unit => {
            if (unit.toLowerCase() == 'oz') {
                setWaterDisplacedUnit(VolumeUnit.OZ);
            } else if (unit.toLowerCase() == 'ml') {
                setWaterDisplacedUnit(VolumeUnit.ML);
            }
        });

        readValue('volumeUnit', setVolumeUnit, VolumeUnit.OZ).then(unit => {
            if (unit.toLowerCase() == 'oz') {
                setVolumeUnit(VolumeUnit.OZ);
            } else if (unit.toLowerCase() == 'ml') {
                setVolumeUnit(VolumeUnit.ML);
            }
        });

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
