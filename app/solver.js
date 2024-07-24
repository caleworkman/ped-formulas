import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';

import AppText from '../components/appText.js';

import data from '../assets/formulaDetails.json';
import FormulaDetailsView from '../components/formulaDetailsView';
import { ML_TO_OZ } from '../assets/constants.js';

function calculateRatios(calories, formula) {
    const calories_per_cup = formula?.units['cup'].calories;
    const cups = Math.floor(calories / calories_per_cup);
    let remainder = calories - (cups * calories_per_cup);

    const calories_per_scoop = formula?.units['scoop'].calories;
    const scoops = Math.floor(remainder / calories_per_scoop);
    remainder = remainder - (scoops * calories_per_scoop);

    const calories_per_tbsp = formula?.units['tbsp'].calories;
    const tbsps = Math.floor(remainder / calories_per_tbsp);
    remainder = remainder - (tbsps * calories_per_tbsp);

    const calories_per_tsp = formula?.units['tsp'].calories;
    const tsps = Math.floor(remainder / calories_per_tsp);

    return {
        'cups': cups ? cups : '',
        'scoops': scoops ? scoops : '',
        'tbsps': tbsps ? tbsps : '',
        'tsps': tsps ? tsps : '',
        'calories': cups * calories_per_cup + scoops * calories_per_scoop + tbsps * calories_per_tbsp + tsps * calories_per_tsp ?? 0
    }
}

function calcualateDisplacement(formula, ratios) {
    const per_cup = ratios?.cups * formula?.units['cup'].displacement;
    const per_scoop = ratios?.scoops * formula?.units['scoop'].displacement;
    const per_tbsp = ratios?.tbsps * formula?.units['tbsp'].displacement;
    const per_tsp = ratios?.tsps * formula?.units['tsp'].displacement;
    return ML_TO_OZ * (per_cup + per_scoop + per_tbsp + per_tsp);
}

function calculateProtein(calories, formula)  {
    return calories * formula?.g_protein_per_100_cal / 100;
}

export default function App() {

    const [selectedFormulaIdx, setSelectedFormulaIdx] = useState();
    const [selectedBrandIdx, setSelectedBrandIdx] = useState();
    const [bodyWeight, setBodyWeight] = useState();
    const [bottleSizeOz, setBottleSizeOz] = useState();
    const [calorieTarget, setCalorieTarget] = useState();

    const brands = [...new Set(Object.values(data.formulas).map(f => f.brand))]
    const selectedBrand = selectedBrandIdx ? brands[selectedBrandIdx] : ''

    const formulas = selectedBrand ? data.formulas.filter(f => f.brand == selectedBrand) : data.formulas

    const ratios = calculateRatios(calorieTarget, formulas[selectedFormulaIdx])
    const displacement = calcualateDisplacement(formulas[selectedFormulaIdx], ratios)

    return (
        <View style={styles.container}>

            <table>
                <tbody>
                    <tr>
                        <td><AppText>Brand</AppText></td>
                        <td>
                            <Picker style={styles.picker} selectedValue={selectedBrandIdx} onValueChange={idx => setSelectedBrandIdx(idx)} >
                                {brands.map((x, idx) => <Picker.Item key={x + idx} label={x} value={idx} />)}
                            </Picker>
                        </td>
                    </tr>
                    <tr>
                        <td><AppText>Formula</AppText></td>
                        <td>
                            <Picker style={styles.picker} selectedValue={selectedFormulaIdx} onValueChange={idx => setSelectedFormulaIdx(idx)}>
                                {formulas.map((x, idx) => <Picker.Item key={x.uuid} label={x.name} value={idx} />)}
                            </Picker>
                        </td>
                    </tr>
                    <tr>
                        <td><AppText>Body Weight (kg)</AppText></td>
                        <td><TextInput style={styles.input} type='number' onChangeText={value => setBodyWeight(value)} /></td>
                    </tr>
                    <tr>
                        <td><AppText>Bottle Size (oz)</AppText></td>
                        <td><TextInput style={styles.input} onChangeText={value => setBottleSizeOz(value)} /></td>
                    </tr>
                    <tr>
                        <td><AppText>Calories</AppText></td>
                        <td><TextInput style={styles.input} inputMode='numeric' onChangeText={value => setCalorieTarget(value)} /></td>
                    </tr>
                </tbody>

            </table>

            <table>
                <thead>
                    <tr>
                        <th><AppText>CUPS</AppText></th>
                        <th><AppText>SCOOPS</AppText></th>
                        <th><AppText>TBSP</AppText></th>
                        <th><AppText>TSP</AppText></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><AppText>{ratios.cups ?? ''}</AppText></td>
                        <td><AppText>{ratios.scoops ?? ''}</AppText></td>
                        <td><AppText>{ratios.tbsps ?? ''}</AppText></td>
                        <td><AppText>{ratios.tsps ?? ''}</AppText></td>
                    </tr>
                    <tr>
                        <td><AppText>Water Displaced (oz)</AppText></td>
                        <td><AppText>{displacement ?? ''}</AppText></td>
                    </tr>
                    <tr>
                        <td><AppText>Water to Mix (oz)</AppText></td>
                        <td><AppText>{(bottleSizeOz - displacement) ?? ''}</AppText></td>
                    </tr>
                    <tr>
                        <td><AppText>Protein (g)</AppText></td>
                        <td><AppText>{calculateProtein(ratios.calories, formulas[selectedFormulaIdx]) ?? ''}</AppText></td>
                    </tr>

                </tbody>
            </table>


            {selectedFormulaIdx ? <FormulaDetailsView {...data.formulas[selectedFormulaIdx]} /> : <></>}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        padding: '4px'
    },
    input: {
        backgroundColor: 'white',
        padding: '4px'
    }
});
