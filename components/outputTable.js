import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';

import { ML_TO_OZ } from '../assets/constants.js';
import { MY_RED, MY_BLUE, MY_WHITE } from '../assets/constants.js';
import AppText from '../components/appText.js';

import ExpandCircleDown from '../assets/expandCircleDown.js';
import ExpandCircleUp from '../assets/expandCircleUp.js';


const OutputTable = (props) => {

    const [useOz, setUseOz] = useState(true);
    const [expanded, setExpanded] = useState(false);

    let waterToMixOz = (props.volumeOz - props.displacementOz) || 0;
    let waterToMixML = waterToMixOz / ML_TO_OZ
    waterToMixOz = waterToMixOz > 0 ? waterToMixOz.toFixed(1) + ' oz' : '-';
    waterToMixML = waterToMixML > 0 ? waterToMixML.toFixed(0) + ' mL' : '-';

    let displacementOz = (props.displacementOz?.toFixed(1) || '0') + " oz"
    let displacementML = ((props.displacementOz / ML_TO_OZ).toFixed(0) || '0') + " mL"

    let proteinPerKg = (props.bodyWeight > 0) ? (props.protein / props.bodyWeight).toFixed(1) + ' g / kg' : '-';

    // This will always be a negative number because of the way cups/scoops/etc are calculated
    const percentCalorieDifference = Math.abs(100 * (props.calories - props.calorieTarget) / props.calorieTarget) || 0;

    return (
        <View style={{
            border: 'solid 2px',
            borderColor: props.acceptableProtein || props.protein == 0 || props.bodyweight == 0 ? MY_WHITE : MY_RED,
            borderRadius: '4px',
            background: MY_BLUE,
            padding: "4px",
            display: "flex",
            alignItems: "center"
        }}>

            <table style={{
                borderSpacing: '8px',
            }}>
                <tbody>

                    <tr>
                        <td><AppText><Text style={{ fontWeight: 'bold' }}>Calories</Text></AppText></td>
                        <td><AppText>{props.calories?.toFixed(1)}</AppText></td>
                    </tr>

                    {expanded & props.calorieTarget
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


                    {expanded
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

                    {expanded
                        ? <tr>
                            <td><AppText><Text style={{ fontWeight: 'bold' }}>Protein per kg</Text></AppText></td>
                            <td><AppText>{proteinPerKg}</AppText></td>
                        </tr>
                        : <></>
                    }
                </tbody>
            </table>


            <Pressable onPress={() => setExpanded(prevState => !prevState)} style={{padding: "4px"}}>
                {expanded ? <ExpandCircleUp /> : <ExpandCircleDown />}
            </Pressable>

        </View>
    );
};

export default OutputTable;