import { StyleSheet, View } from 'react-native';
import { useContext, useState } from 'react';

import { PROTEIN_LIMIT_G_PER_KG } from '../assets/constants.js';

import InputWithLabel from '../components/inputWithLabel.js';
import CustomTextInput from '../components/customTextInput.js';
import FormulaContext from '../components/formulaContext.js';
import FormulaPicker from '../components/formulaPicker.js';
import ProteinWarning from '../components/proteinWarning.js';


import { calculateCalories } from '../functions/calc/calculateCalories.js';
import { calculateDisplacement } from '../functions/calc/calculateDisplacement.js';
import { calculateProtein } from '../functions/calc/calculateProtein.js';

import OutputTable from '../components/outputTable.js';
import { useLocalSearchParams } from 'expo-router';


export default function Adjust() {

    const params = useLocalSearchParams();

    const [waterOz, setWaterOz] = useState(parseFloat(params?.water ?? 0));
    const [bodyWeight, setBodyWeight] = useState(parseFloat(params?.bodyWeight ?? 0));
    const [numCups, setNumCups] = useState(parseFloat(params?.numCups ?? 0));
    const [numScoops, setNumScoops] = useState(parseFloat(params?.numScoops ?? 0));
    const [numTbsps, setNumTbsps] = useState(parseFloat(params?.numTbsps ?? 0));
    const [numTsps, setNumTsps] = useState(parseFloat(params?.numTsps ?? 0));

    const { formula } = useContext(FormulaContext);

    const calories = calculateCalories(numCups, numScoops, numTbsps, numTsps, formula);
    const displacementOz = calculateDisplacement(numCups, numScoops, numTbsps, numTsps, formula);
    const protein = calculateProtein(calories, formula);
    const acceptableProtein = protein / bodyWeight <= PROTEIN_LIMIT_G_PER_KG;

    return (
        <View style={styles.container}>

            <View style={{ margin: '10px', width: '300px' }}>

                <FormulaPicker />

                <InputWithLabel label="Water (oz)">
                    <CustomTextInput 
                        value={waterOz}
                        inputMode='decimal' 
                        onChangeText={value => setWaterOz(value)}
                        clearTextOnFocus={true}
                    />
                </InputWithLabel>

                <InputWithLabel label="Body Weight (kg)">
                    <CustomTextInput 
                        value={bodyWeight}
                        inputMode='decimal' 
                        onChangeText={value => setBodyWeight(value)} 
                        clearTextOnFocus={true}
                    />
                </InputWithLabel>

                <View style={{ paddingTop: "10px" }}>
                    <InputWithLabel label="Cups" oneLine={true}>
                        <CustomTextInput 
                            value={numCups}
                            inputMode='numeric' 
                            onChangeText={value => setNumCups(value)} style={{width: "50px", textAlign: "center"}} 
                            clearTextOnFocus={true}
                        />
                    </InputWithLabel>

                    <InputWithLabel label="Scoops" oneLine={true}>
                        <CustomTextInput 
                            value={numScoops}
                            inputMode='numeric' 
                            onChangeText={value => setNumScoops(value)} style={{width: "50px", textAlign: "center"}}
                            clearTextOnFocus={true}
                        />
                    </InputWithLabel>

                    <InputWithLabel label="Tbsp" oneLine={true}>
                        <CustomTextInput 
                            value={numTbsps}
                            inputMode='numeric' 
                            onChangeText={value => setNumTbsps(value)} style={{width: "50px", textAlign: "center"}} 
                            clearTextOnFocus={true}
                        />
                    </InputWithLabel>

                    <InputWithLabel label="Tsp" oneLine={true}>
                        <CustomTextInput 
                            value={numTsps}
                            inputMode='numeric' 
                            onChangeText={value => setNumTsps(value)} style={{width: "50px", textAlign: "center"}} 
                            clearTextOnFocus={true}
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
                totalVolume={waterOz + displacementOz}
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
});
