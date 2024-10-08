import { StyleSheet, View } from 'react-native';
import { useContext, useState } from 'react';

import UnitSelector from '../components/unitSelector';


export default function Settings() {

    const [waterToMixUnit, setWaterToMixUnit] = useState('mL');
    const [waterDisplacedUnit, setWaterDisplacedUnit] = useState('mL')
    const [volumeUnit, setVolumeUnit] = useState('oz')

    return (
        <View style={styles.container}>

            <View style={styles.item}>
                <UnitSelector
                    displayName='Water to Mix'
                    selected={waterToMixUnit}
                    options={['oz', 'mL']}
                    onSelectOption={x => setWaterToMixUnit(x)}
                />
            </View>
    
            <View style={styles.item}>
                <UnitSelector
                    displayName='Water Displaced'
                    selected={waterDisplacedUnit}
                    options={['oz', 'mL']}
                    onSelectOption={x => setWaterDisplacedUnit(x)}
                />
            </View>

            <View style={styles.item}>
                <UnitSelector
                    displayName='Volume'
                    selected={volumeUnit}
                    options={['oz', 'mL']}
                    onSelectOption={x => setVolumeUnit(x)}
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
