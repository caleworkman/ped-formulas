import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { PROTEIN_LIMIT_G_PER_KG } from '../assets/constants.js';
import { MY_RED, MY_BLUE, MY_DARK_BLUE } from '../assets/constants.js';

import AppText from '../components/appText.js';
import InputWithLabel from '../components/inputWithLabel.js';
import CustomTextInput from '../components/customTextInput.js';
import MixingRatioString from '../components/mixingRatioString.js';
import OutputTable from '../components/outputTable';

import FormulaPicker from '../components/formulaPicker';

import { calculateRatios } from '../functions/calculateRatios';
import { calculateCalories } from '../functions/calculateCalories';
import { calculateDisplacement } from '../functions/calculateDisplacement';
import { calculateProtein } from '../functions/calculateProtein';


export default function App() {

    const [bodyWeight, setBodyWeight] = useState(0);
    const [volumeOz, setVolumeOz] = useState(0);
    const [calorieTarget, setCalorieTarget] = useState(0);
    const [showMoreDetail, setShowMoreDetail] = useState(false);
    const [caloriesPerOz, setCaloriesPerOz] = useState(false);

    const [formula, setFormula] = useState()

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

                <FormulaPicker
                    onValueChange={f => setFormula(f)}
                />

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
                                <Text style={{ fontSize: '12px' }}>
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
                        <View style={{ padding: '4px', alignSelf: 'center' }}>
                            <MixingRatioString cups={numCups} scoops={numScoops} tbsps={numTbsps} tsps={numTsps} />
                        </View>
                        {(!acceptableProtein && bodyWeight)
                            ? <View style={{ padding: '6px', marginTop: '4px', alignSelf: 'center', border: 'solid 1px', borderRadius: '4px', backgroundColor: MY_RED }}>
                                <AppText><Text style={{ fontWeight: 'bold' }}>Protein per kg is greater than {PROTEIN_LIMIT_G_PER_KG} g/kg</Text></AppText>
                            </View>
                            : <></>
                        }
                    </View>
                    : <></>
                }
            </View>

            <OutputTable
                calories={calories}
                calorieTarget={caloriesPerOz ? volumeOz * calorieTarget : calorieTarget}
                displacementOz={displacementOz}
                volumeOz={volumeOz}
                protein={protein}
                acceptableProtein={acceptableProtein}
                bodyweight={bodyWeight}
                expanded={showMoreDetail}
            />

            <View style={{ flexDirection: 'row', padding: '12px' }}>
                <Pressable
                    onPress={() => setShowMoreDetail(prevState => !prevState)}
                    style={[styles.button, showMoreDetail ? styles.pressed : styles.unpressed]}>
                    <AppText>
                        <Text style={{ fontSize: '12px' }}>
                            {showMoreDetail ? "Less Detail" : "More Detail"}
                        </Text>
                    </AppText>
                </Pressable>
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
