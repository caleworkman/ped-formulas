import { Pressable, StyleSheet, Text, ScrollView, View } from 'react-native';
import { useContext, useState } from 'react';
import { Link } from 'expo-router';

import { PROTEIN_LIMIT_G_PER_KG } from '../assets/constants.js';
import { MY_BLUE, MY_DARK_BLUE } from '../assets/constants.js';
import EditSquare from '../assets/editSquare';


import AppText from '../components/appText.js';
import InputWithLabel from '../components/inputWithLabel.js';
import CustomTextInput from '../components/customTextInput.js';
import MixingRatioString from '../components/mixingRatioString.js';
import ProteinWarning from '../components/proteinWarning.js';
import OutputTable from '../components/outputTable.js';
import FormulaContext from '../components/formulaContext.js';
import FormulaPicker from '../components/formulaPicker.js';

import { calculateRatios } from '../functions/calculateRatios';
import { calculateCalories } from '../functions/calculateCalories';
import { calculateDisplacement } from '../functions/calculateDisplacement';
import { calculateProtein } from '../functions/calculateProtein';


export default function App() {

    const [bodyWeight, setBodyWeight] = useState(0);
    const [volumeOz, setVolumeOz] = useState(0);
    const [calorieTarget, setCalorieTarget] = useState(0);
    const [caloriesPerOz, setCaloriesPerOz] = useState(false);

    const { formula } = useContext(FormulaContext);

    const { numCups, numScoops, numTbsps, numTsps } = calculateRatios(caloriesPerOz ? volumeOz * calorieTarget : calorieTarget, formula);
    const calories = calculateCalories(numCups, numScoops, numTbsps, numTsps, formula);
    const displacementOz = calculateDisplacement(numCups, numScoops, numTbsps, numTsps, formula);
    const protein = calculateProtein(calories, formula);
    const acceptableProtein = protein / bodyWeight <= PROTEIN_LIMIT_G_PER_KG;

    return (

            <View style={styles.container}>

                <View style={{
                    margin: '10px',
                    width: '300px',
                }}>

                    <FormulaPicker />

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <View style={{ flexGrow: '1', marginRight: '8px' }}>
                            <InputWithLabel label={caloriesPerOz ? "Calories / oz" : "Calories"}>
                                <CustomTextInput inputMode='decimal' onChangeText={value => setCalorieTarget(value)} />
                            </InputWithLabel>
                        </View>
                        <View style={{ marginBottom: '4px' }}>
                            <Pressable
                                onPress={() => setCaloriesPerOz(prevState => !prevState)}
                                style={[styles.button, caloriesPerOz ? styles.pressed : styles.unpressed]}>
                                <AppText>
                                    <Text style={{ fontSize: '16px' }}>
                                        Per Oz
                                    </Text>
                                </AppText>
                            </Pressable>
                        </View>
                    </View>

                    <InputWithLabel label="Volume (oz)">
                        <CustomTextInput inputMode='decimal' onChangeText={value => setVolumeOz(value)} />
                    </InputWithLabel>

                    <InputWithLabel label="Body Weight (kg)">
                        <CustomTextInput inputMode='decimal' onChangeText={value => setBodyWeight(value)} />
                    </InputWithLabel>

                </View>

                <View style={{ margin: '10px' }}>
                    {calories > 0
                        ? <View>
                            <View style={{ padding: '4px', alignSelf: 'center', display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <MixingRatioString
                                    numCups={numCups}
                                    numScoops={numScoops}
                                    numTbsps={numTbsps}
                                    numTsps={numTsps}
                                />
                                <Link
                                    style={{ paddingLeft: "8px", top: "2px" }}
                                    href={{
                                        pathname: '/adjust',
                                        params: {
                                            formulaBrandName: formula.brand,
                                            formulaUuid: formula.uuid,
                                            numCups: numCups,
                                            numScoops: numScoops,
                                            numTbsps: numTbsps,
                                            numTsps: numTsps,
                                            bodyWeight: bodyWeight,
                                            water: parseFloat((volumeOz - displacementOz).toFixed(1))
                                        }
                                    }}
                                >
                                    <EditSquare />
                                </Link>
                            </View>
                            {(!acceptableProtein && bodyWeight)
                                ? <ProteinWarning protein_limit={PROTEIN_LIMIT_G_PER_KG} />
                                : <></>
                            }
                        </View>
                        : <></>
                    }
                </View>

                <OutputTable
                    calories={calories}
                    calorieDifference={calorieTarget ? Math.abs(100 * (calories - calorieTarget) / calorieTarget) : 0}
                    waterToMixOz={volumeOz - displacementOz > 0 ? volumeOz - displacementOz : 0}
                    waterDisplacedOz={displacementOz}
                    protein={protein}
                    proteinPerKg={bodyWeight ? (protein / bodyWeight).toFixed(1) : "-"}
                    acceptableProtein={acceptableProtein}
                />

            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
    },
    button: {
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingRight: '8px',
        paddingLeft: '8px',
        borderRadius: '4px',
        elevation: '5px',
    },
    pressed: {
        backgroundColor: MY_DARK_BLUE,
    },
    unpressed: {
        backgroundColor: MY_BLUE,
        shadowColor: 'black',
        shadowRadius: '5px',
        shadowOffset: { width: '0px', height: '2px' }
    }
});
