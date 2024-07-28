import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';

import AppText from '../components/appText.js';

import data from '../assets/formulaDetails.json';
import FormulaDetailsView from '../components/formulaDetailsView.js';
import { ML_TO_OZ } from '../assets/constants.js';

import InputWithlabel from '../components/inputWithLabel.js';
import CustomPicker from '../components/customPicker.js';
import CustomTextInput from '../components/customTextInput.js';
import MixingRatioString from '../components/mixingRatioString.js';

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
        'cups': cups ? cups : 0,
        'scoops': scoops ? scoops : 0,
        'tbsps': tbsps ? tbsps : 0,
        'tsps': tsps ? tsps : 0,
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

    const [selectedFormulaIdx, setSelectedFormulaIdx] = useState(0);
    const [selectedBrandIdx, setSelectedBrandIdx] = useState(0);
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

            <View style={{
                margin: '10px',
                width: '300px',
            }}>

                <InputWithlabel label="Brand">
                    <CustomPicker selectedValue={selectedBrandIdx} onValueChange={idx => setSelectedBrandIdx(idx)} >
                        {brands.map((x, idx) => <Picker.Item key={x + idx} label={x} value={idx} />)}
                    </CustomPicker>
                </InputWithlabel>

                <InputWithlabel label="Formula">
                    <CustomPicker selectedValue={selectedFormulaIdx} onValueChange={idx => setSelectedFormulaIdx(idx)}>
                        {formulas.map((x, idx) => <Picker.Item key={x.uuid} label={x.name} value={idx} />)}
                    </CustomPicker>
                </InputWithlabel>

                <InputWithlabel label="Calories">
                    <CustomTextInput inputMode='numeric' onChangeText={value => setCalorieTarget(value)} />
                </InputWithlabel>

                <InputWithlabel label="Bottle Size (oz)">
                    <CustomTextInput onChangeText={value => setBottleSizeOz(value)} />
                </InputWithlabel>

                <InputWithlabel label="Body Weight (kg)">
                    <CustomTextInput type='number' onChangeText={value => setBodyWeight(value)} />
                </InputWithlabel>

            </View>

            <View style={{ margin: '10px'}}>
                <AppText>Mixing Results</AppText>
                <MixingRatioString cups={ratios.cups} scoops={ratios.scoops} tbsps={ratios.tbsps} tsps={ratios.tsps} calories={ratios.calories} />
            </View>
            
        
            <table>
                <tbody>
                    <tr>
                        <td><AppText>Calories</AppText></td>
                        <td><AppText>{ratios.calories ?? ''}</AppText></td>
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
