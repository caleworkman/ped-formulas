import { Text } from 'react-native';
import { useState } from 'react';
import { Pressable } from 'react-native';

import { ML_TO_OZ } from '../assets/constants.js';
import { MY_RED, MY_BLUE, MY_WHITE } from '../assets/constants.js';
import AppText from '../components/appText.js';


const OutputTable = (props) => {

    const [useOz, setUseOz] = useState(true);

    let waterToMixOz = (props.volumeOz - props.displacementOz) || 0;
    let waterToMixML = waterToMixOz / ML_TO_OZ
    waterToMixOz = waterToMixOz > 0 ? waterToMixOz.toFixed(1) + ' oz' : '-';
    waterToMixML = waterToMixML > 0 ? waterToMixML.toFixed(0) + ' mL' : '-';

    let displacementOz = (props.displacementOz?.toFixed(1) || '0') + " oz"
    let displacementML = ((props.displacementOz / ML_TO_OZ).toFixed(0) || '0') + " mL"

    let proteinPerKg = (props.bodyweight > 0) ? (props.protein / props.bodyweight).toFixed(1) + ' g / kg' : '-';

    // This will always be a negative number because of the way cups/scoops/etc are calculated
    const percentCalorieDifference = Math.abs(100 * (props.calories - props.calorieTarget) / props.calorieTarget) || 0;


    return (
        <table style={{ 
            border: 'solid 1px', 
            borderColor: props.acceptableProtein || props.protein == 0 || props.bodyweight == 0 ? MY_WHITE : MY_RED, 
            borderRadius: '4px', 
            borderSpacing: '8px', 
            background: MY_BLUE }}>
            <tbody>

                <tr>
                    <td><AppText><Text style={{ fontWeight: 'bold' }}>Calories</Text></AppText></td>
                    <td><AppText>{props.calories?.toFixed(1)}</AppText></td>
                </tr>

                {props.expanded
                    ? <tr>
                        <td><AppText><Text style={{ fontWeight: 'bold' }}>Calorie Difference</Text></AppText></td>
                        <td><AppText>{percentCalorieDifference?.toFixed(0)} %</AppText></td>
                    </tr>
                    : <></>
                }

                <tr>
                    <td><AppText><Text style={{ fontWeight: 'bold' }}>Water to Mix</Text></AppText></td>
                    <td>
                        <Pressable onPress={() => setUseOz(prevState => !prevState)}>
                            <AppText>{useOz ? waterToMixOz : waterToMixML}</AppText>
                        </Pressable>
                    </td>
                </tr>

                
                {props.expanded
                    ? <tr>
                        <td><AppText><Text style={{ fontWeight: 'bold' }}>Water Displaced</Text></AppText></td>
                        <td>
                            <Pressable onPress={() => setUseOz(prevState => !prevState)}>
                                <AppText>{useOz ? displacementOz : displacementML}</AppText>
                            </Pressable>
                        </td>
                    </tr>
                    : <></>
                }

                <tr>
                    <td><AppText><Text style={{ fontWeight: 'bold' }}>Protein</Text></AppText></td>
                    <td><AppText>{props.protein?.toFixed(1) || '0.0'} g</AppText></td>
                </tr>

                {props.expanded
                    ? <tr>
                        <td><AppText><Text style={{ fontWeight: 'bold' }}>Protein per kg</Text></AppText></td>
                        <td><AppText>{proteinPerKg}</AppText></td>
                    </tr>
                    : <></>
                }

            </tbody>
        </table>
    );
};

export default OutputTable;