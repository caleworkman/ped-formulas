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

    function convertVolume(volume, useOz) {
        if (useOz) {
            return volume.toFixed(1) + " oz";
        } else {
            return (volume / ML_TO_OZ).toFixed(1) + " mL"
        }
    }

    return (
        <View style={{
            border: 'solid 2px',
            borderColor: props.acceptableProtein || props.protein == 0 || props.bodyWeight == 0 ? MY_WHITE : MY_RED,
            borderRadius: '4px',
            background: MY_BLUE,
            padding: "4px",
            display: "flex",
            alignItems: "center"
        }}>

            <table style={{ borderSpacing: '8px' }}>
                <tbody>

                    {typeof(props.calories) == "number" ?
                        <tr>
                            <td>
                                <AppText><Text style={{fontWeight: "bold"}}>Calories</Text></AppText>
                            </td>
                            <td>
                                <AppText>{props.calories.toFixed(1)}</AppText>
                            </td>
                        </tr>
                        : <></>
                    }               

                    {typeof(props.calorieDifference) == "number" && expanded ?
                        <tr>
                            <td>
                                <AppText><Text style={{fontWeight: "bold"}}>Difference</Text></AppText>
                            </td>
                            <td>
                                <AppText>{props.calorieDifference.toFixed(0) + "%"}</AppText>
                            </td>
                        </tr>
                        : <></>
                    }

                    {typeof(props.totalVolume) == "number" ?
                            
                        <tr>
                            <td>
                                <AppText><Text style={{fontWeight: "bold"}}>Total Volume</Text></AppText>
                            </td>
                            <td>
                                <Pressable onPress={() =>setUseOz(prevState => !prevState)}>
                                    <AppText>{convertVolume(props.totalVolume, useOz)}</AppText>
                                </Pressable>
                            </td>
                        </tr>
                        : <></>
                    }

                    {typeof(props.waterToMixOz) == "number" ?
                        <tr>
                            <td>
                                <AppText><Text style={{fontWeight: "bold"}}>Water to Mix</Text></AppText>
                            </td>
                            <td>
                                <Pressable onPress={() =>setUseOz(prevState => !prevState)}>
                                    <AppText>{convertVolume(props.waterToMixOz, useOz)}</AppText>
                                </Pressable>
                            </td>
                        </tr>
                        : <></>
                    }

                    {typeof(props.waterDisplacedOz) == "number" & expanded ?
                        <tr>
                            <td>
                                <AppText><Text style={{fontWeight: "bold"}}>Water Displaced</Text></AppText>
                            </td>
                            <td>
                                <Pressable onPress={() =>setUseOz(prevState => !prevState)}>
                                    <AppText>{convertVolume(props.waterDisplacedOz, useOz)}</AppText>
                                </Pressable>
                            </td>
                        </tr>
                        : <></>
                    }

                    {typeof(props.protein) == "number" ?
                        <tr>
                            <td>
                                <AppText><Text style={{fontWeight: "bold"}}>Protein</Text></AppText>
                            </td>
                            <td>
                                <AppText>{props.protein.toFixed(1) + " g"}</AppText>
                            </td>
                        </tr>
                        : <></>
                    }       

                    {props.proteinPerKg && expanded ?
                        <tr>
                            <td>
                                <AppText><Text style={{fontWeight: "bold"}}>Protein per kg</Text></AppText>
                            </td>
                            <td>
                                <AppText>{props.proteinPerKg + " kg / g"}</AppText>
                            </td>
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