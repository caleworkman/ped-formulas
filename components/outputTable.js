import { Text } from 'react-native';
import { ML_TO_OZ } from '../assets/constants.js';
import { MY_BLUE, MY_WHITE } from '../assets/constants.js';
import AppText from '../components/appText.js';


const OutputTable = (props) => {

    let waterToMix = (props.bottleSizeOz - props.displacement) || 0;
    waterToMix = waterToMix > 0 ? waterToMix.toFixed(1) + ' oz' : '-';

    let proteinPerKg = (props.bodyweight > 0) ? (props.protein / props.bodyweight).toFixed(1) + ' g / kg' : '-';

    // This will always be a negative number because of the way cups/scoops/etc are calculated
    const percentCalorieDifference = Math.abs(100 * (props.calories - props.calorieTarget) / props.calorieTarget) || 0;


    return (
        <table style={{ border: 'solid 1px', borderColor: MY_WHITE, borderRadius: '4px', borderSpacing: '8px', background: MY_BLUE }}>
            <tbody style={{ border: 'solid 1px white', borderSpacing: '4px' }}>

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
                    <td><AppText>{waterToMix}</AppText></td>
                </tr>
                
                {props.expanded
                    ? <tr>
                        <td><AppText><Text style={{ fontWeight: 'bold' }}>Water Displaced</Text></AppText></td>
                        <td><AppText>{props.displacement?.toFixed(1) || ''} oz</AppText></td>
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