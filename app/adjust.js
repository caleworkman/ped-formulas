import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { PROTEIN_LIMIT_G_PER_KG } from '../assets/constants.js';

import InputWithLabel from '../components/inputWithLabel.js';
import CustomTextInput from '../components/customTextInput.js';
import FormulaPicker from '../components/formulaPicker';
import ProteinWarning from '../components/proteinWarning.js';

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
                        <CustomTextInput inputMode='number' onChangeText={value => setNumCups(value)} style={{width: "50px", textAlign: "center"}} />
                    </InputWithLabel>

                    <InputWithLabel label="Scoops" oneLine={true}>
                        <CustomTextInput inputMode='number' onChangeText={value => setNumScoops(value)} style={{width: "50px", textAlign: "center"}}/>
                    </InputWithLabel>

                    <InputWithLabel label="Tbsp" oneLine={true}>
                        <CustomTextInput inputMode='number' onChangeText={value => setNumTbsps(value)} style={{width: "50px", textAlign: "center"}} />
                    </InputWithLabel>

                    <InputWithLabel label="Tsp" oneLine={true}>
                        <CustomTextInput inputMode='number' onChangeText={value => setNumTsps(value)} style={{width: "50px", textAlign: "center"}} />
                    </InputWithLabel>
                </View>

            </View>

            <View style={{ margin: '10px' }}>
                {calories > 0
                    ? <View>
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
                displacementOz={displacementOz}
                volumeOz={volume}
                protein={protein}
                acceptableProtein={acceptableProtein}
                bodyWeight={bodyWeight}
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
