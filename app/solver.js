import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';

import data from '../assets/formulaDetails.json';
import FormulaDetailsView from '../components/formulaDetailsView';

function calculateRatios(oz, calories, formula) {
    const calories_per_cup = formula?.units['cup'].calories;
    const cups = Math.floor(calories/calories_per_cup);
    let remainder = calories / (cups * calories_per_cup);

    const calories_per_scoop = formula?.units['scoop'].calories;
    const scoops = Math.floor(remainder/calories_per_scoop);
    remainder = remainder / (scoops * calories_per_scoop);

    const calories_per_tbsp = formula?.units['tbsp'].calories;
    const tbsps = Math.floor(remainder/calories_per_tbsp);
    remainder = remainder / (tbsps * calories_per_tbsp);

    const calories_per_tsp = formula?.units['tsp'].calories;
    const tsps = Math.floor(remainder/calories_per_tsp);

    return {
        'cups': cups ? cups : '',
        'scoops': scoops ? scoops : '',
        'tbsps': tbsps ? tbsps : '',
        'tsps': tsps ? tsps : ''
    }
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

    const ratios = calculateRatios(bottleSizeOz, calorieTarget, formulas[selectedFormulaIdx])

    return (
        <View style={styles.container}>

            <table style={styles.table}>
                <tr>
                    <td><Text>Brand</Text></td>
                    <td> 
                        <Picker selectedValue={selectedBrandIdx} onValueChange={idx => setSelectedBrandIdx(idx)} >
                            {brands.map((x, idx) => <Picker.Item key={x + idx} label={x} value={idx} />)}
                        </Picker>
                    </td>
                </tr>
                <tr>
                    <td><Text>Formula</Text></td>
                    <td> 
                        <Picker selectedValue={selectedFormulaIdx} onValueChange={idx => setSelectedFormulaIdx(idx)}>
                            {formulas.map((x, idx) => <Picker.Item key={x.uuid} label={x.name} value={idx} />)}
                        </Picker>
                    </td>
                </tr>
                <tr>
                    <td>Body Weight (kg)</td>
                    <td><TextInput type='number' onChangeText={value => setBodyWeight(value)} /></td>
                </tr>
                <tr>
                    <td>Bottle Size (oz)</td>
                    <td><TextInput onChangeText={value => setBottleSizeOz(value)} /></td>
                </tr>
                <tr>
                    <td>Calories</td>
                    <td><TextInput onChangeText={value => setCalorieTarget(value)} /></td>
                </tr>
            </table>

            <table>
                <thead>
                <tr>
                    <th>CUPS</th>
                    <th>SCOOPS</th>
                    <th>TBSP</th>
                    <th>TSP</th>
                </tr>
                </thead>
                <tbody>
                    <td>{ratios.cups}</td>
                    <td>{ratios.scoops}</td>
                    <td>{ratios.tbsps}</td>
                    <td>{ratios.tsps}</td>
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
    table: {
        fontColor: 'white'
    }
});
