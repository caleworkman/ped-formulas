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
import { useLocalSearchParams } from 'expo-router';


export default function App() {

    const params = useLocalSearchParams();

    const [volume, setVolume] = useState(params?.volumeOz);
    const [bodyWeight, setBodyWeight] = useState(params?.bodyWeight);
    const [numCups, setNumCups] = useState(params?.numCups);
    const [numScoops, setNumScoops] = useState(params?.numScoops);
    const [numTbsps, setNumTbsps] = useState(params?.numTbsps);
    const [numTsps, setNumTsps] = useState(params?.numTsps);
    const [formula, setFormula] = useState(params?.formula);

    const calories = calculateCalories(numCups, numScoops, numTbsps, numTsps, formula);
    const displacementOz = calculateDisplacement(numCups, numScoops, numTbsps, numTsps, formula);
    const protein = calculateProtein(calories, formula);
    const acceptableProtein = protein / bodyWeight <= PROTEIN_LIMIT_G_PER_KG;

    return (
        <View style={styles.container}>

            <View style={{ margin: '10px', width: '300px' }}>

                <FormulaPicker 
                    defaultBrandName={params?.formulaBrandName} 
                    defaultFormulaUuid={params?.formulaUuid}
                    onValueChange={f => setFormula(f)} 
                />

                <InputWithLabel label="Water (oz)">
                    <CustomTextInput 
                        value={volume}
                        inputMode='decimal' 
                        onChangeText={value => setVolume(value)} 
                    />
                </InputWithLabel>

                <InputWithLabel label="Body Weight (kg)">
                    <CustomTextInput 
                        value={bodyWeight}
                        inputMode='decimal' 
                        onChangeText={value => setBodyWeight(value)} 
                    />
                </InputWithLabel>

                <View style={{ paddingTop: "10px" }}>
                    <InputWithLabel label="Cups" oneLine={true}>
                        <CustomTextInput 
                            value={numCups}
                            inputMode='number' 
                            onChangeText={value => setNumCups(value)} style={{width: "50px", textAlign: "center"}} 
                        />
                    </InputWithLabel>

                    <InputWithLabel label="Scoops" oneLine={true}>
                        <CustomTextInput 
                            value={numScoops}
                            inputMode='number' 
                            onChangeText={value => setNumScoops(value)} style={{width: "50px", textAlign: "center"}}
                        />
                    </InputWithLabel>

                    <InputWithLabel label="Tbsp" oneLine={true}>
                        <CustomTextInput 
                            value={numTbsps}
                            inputMode='number' 
                            onChangeText={value => setNumTbsps(value)} style={{width: "50px", textAlign: "center"}} 
                        />
                    </InputWithLabel>

                    <InputWithLabel label="Tsp" oneLine={true}>
                        <CustomTextInput 
                            value={numTsps}
                            inputMode='number' 
                            onChangeText={value => setNumTsps(value)} style={{width: "50px", textAlign: "center"}} 
                        />
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
