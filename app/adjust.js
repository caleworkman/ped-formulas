import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { PROTEIN_LIMIT_G_PER_KG } from '../assets/constants.js';
import { MY_RED, MY_BLUE, MY_DARK_BLUE } from '../assets/constants.js';

import AppText from '../components/appText.js';
import InputWithLabel from '../components/inputWithLabel.js';
import CustomTextInput from '../components/customTextInput.js';
import FormulaPicker from '../components/formulaPicker';

import { calculateCalories } from '../functions/calculateCalories';
import { calculateDisplacement } from '../functions/calculateDisplacement';
import { calculateProtein } from '../functions/calculateProtein';

import OutputTable from '../components/outputTable.js';


export default function App() {

    const [volume, setVolume] = useState(0);
    const [bodyWeight, setBodyWeight] = useState(0);
    const [numCups, setNumCups] = useState(0);
    const [numScoops, setNumScoops] = useState(0);
    const [numTbsps, setNumTbsps] = useState(0);
    const [numTsps, setNumTsps] = useState(0);
    const [formula, setFormula] = useState();

    const calories = calculateCalories(numCups, numScoops, numTbsps, numTsps, formula);
    const displacementOz = calculateDisplacement(numCups, numScoops, numTbsps, numTsps, formula);
    const protein = calculateProtein(calories, formula);
    const acceptableProtein = protein / bodyWeight <= PROTEIN_LIMIT_G_PER_KG;

    return (
        <View style={styles.container}>

            <View style={{ margin: '10px', width: '300px' }}>

                <FormulaPicker onValueChange={f => setFormula(f)} />

                <InputWithLabel label="Water (oz)">
                    <CustomTextInput inputMode='decimal' onChangeText={value => setVolume(value)} />
                </InputWithLabel>

                <InputWithLabel label="Body Weight (kg)">
                    <CustomTextInput inputMode='decimal' onChangeText={value => setBodyWeight(value)} />
                </InputWithLabel>

                <View style={{ paddingTop: "10px" }}>
                    <InputWithLabel label="Cups" oneLine={true}>
                        <CustomTextInput inputMode='decimal' onChangeText={value => setNumCups(value)} style={{width: "50px"}} />
                    </InputWithLabel>

                    <InputWithLabel label="Scoops" oneLine={true}>
                        <CustomTextInput inputMode='decimal' onChangeText={value => setNumScoops(value)} style={{width: "50px"}}/>
                    </InputWithLabel>

                    <InputWithLabel label="Tbsp" oneLine={true}>
                        <CustomTextInput inputMode='decimal' onChangeText={value => setNumTbsps(value)} style={{width: "50px"}} />
                    </InputWithLabel>

                    <InputWithLabel label="Tsp" oneLine={true}>
                        <CustomTextInput inputMode='decimal' onChangeText={value => setNumTsps(value)} style={{width: "50px"}} />
                    </InputWithLabel>
                </View>

            </View>

            <View style={{ margin: '10px' }}>
                {calories > 0
                    ? <View>
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
                volumeOz={volume}
                protein={protein}
                acceptableProtein={acceptableProtein}
                // bodyWeight={bodyWeight}
                // expanded={expanded}
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
});
