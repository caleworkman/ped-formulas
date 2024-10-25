import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';

import { MY_RED, MY_BLUE, MY_WHITE } from '../assets/constants.js';
import AppText from './appText.js';

import ExpandCircleDown from '../assets/expandCircleDown.js';
import ExpandCircleUp from '../assets/expandCircleUp.js';

const OutputTable = (props) => {

    const [expanded, setExpanded] = useState(false);

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
                                <AppText>{props.totalVolume + " " + props.volumeUnit}</AppText>
                            </td>
                        </tr>
                        : <></>
                    }

                    {typeof(props.waterToMix) == "number" ?
                        <tr>
                            <td>
                                <AppText><Text style={{fontWeight: "bold"}}>Water to Mix</Text></AppText>
                            </td>
                            <td>
                                <AppText>{props.waterToMix.toFixed(1) + " " + props.waterToMixUnit}</AppText>
                            </td>
                        </tr>
                        : <></>
                    }

                    {typeof(props.waterDisplaced) == "number" & expanded ?
                        <tr>
                            <td>
                                <AppText><Text style={{fontWeight: "bold"}}>Water Displaced</Text></AppText>
                            </td>
                            <td>
                                <AppText>{props.waterDisplaced.toFixed(1) + " " + props.waterDisplacedUnit}</AppText>
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