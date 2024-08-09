import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';

import data from '../assets/formulaDetails.json';
import { ML_TO_OZ, PROTEIN_LIMIT_G_PER_KG } from '../assets/constants.js';
import { MY_RED, MY_BLUE, MY_DARK_BLUE } from '../assets/constants.js';

import AppText from '../components/appText.js';
import InputWithlabel from '../components/inputWithLabel.js';
import CustomPicker from '../components/customPicker.js';
import CustomTextInput from '../components/customTextInput.js';
import MixingRatioString from '../components/mixingRatioString.js';
import OutputTable from '../components/outputTable';

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
        'tsps': tsps ? tsps : 0
    }
}

function calculateCalories(ratios, formula) {
    const calories_per_cup = formula?.units['cup'].calories;
    const calories_per_scoop = formula?.units['scoop'].calories;
    const calories_per_tbsp = formula?.units['tbsp'].calories;
    const calories_per_tsp = formula?.units['tsp'].calories;
    return ratios.cups * calories_per_cup + ratios.scoops * calories_per_scoop + ratios.tbsps * calories_per_tbsp + ratios.tsps * calories_per_tsp
}

function calculateDisplacement(ratios, formula) {
    const per_cup = ratios?.cups * formula?.units['cup'].displacement;
    const per_scoop = ratios?.scoops * formula?.units['scoop'].displacement;
    const per_tbsp = ratios?.tbsps * formula?.units['tbsp'].displacement;
    const per_tsp = ratios?.tsps * formula?.units['tsp'].displacement;
    return ML_TO_OZ * (per_cup + per_scoop + per_tbsp + per_tsp);
}

function calculateProtein(calories, formula) {
    return calories * formula?.g_protein_per_100_cal / 100;
}

export default function App() {

    const [selectedFormulaIdx, setSelectedFormulaIdx] = useState(0);
    const [selectedBrandIdx, setSelectedBrandIdx] = useState(0);
    const [bodyWeight, setBodyWeight] = useState(0);
    const [bottleSizeOz, setBottleSizeOz] = useState(0);
    const [calorieTarget, setCalorieTarget] = useState(0);
    const [showMoreDetail, setShowmMoreDetail] = useState(false);
    const [caloriesPerOz, setCaloriesPerOz] = useState(false);

    const brands = [...new Set(Object.values(data.formulas).map(f => f.brand))];
    const selectedBrand = selectedBrandIdx ? brands[selectedBrandIdx] : '';

    const formulas = selectedBrand ? data.formulas.filter(f => f.brand == selectedBrand) : data.formulas;
    const selectedFormula = formulas[selectedFormulaIdx]

    const ratios = calculateRatios(
        caloriesPerOz ? bottleSizeOz * calorieTarget : calorieTarget, 
        selectedFormula);
    const calories = calculateCalories(ratios, selectedFormula);
    const displacement = calculateDisplacement(ratios, selectedFormula);
    const protein = calculateProtein(calories, selectedFormula);
    const acceptableProtein = protein / bodyWeight <= PROTEIN_LIMIT_G_PER_KG;

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

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', }}>
                    <View style={{ flexGrow: '1', marginRight: '4px' }}>

                        <InputWithlabel label={caloriesPerOz ? "Calories / Oz" : "Calories"}>
                            <CustomTextInput inputMode='decimal' onChangeText={value => setCalorieTarget(value)} />
                        </InputWithlabel>
                    </View>

                    <Pressable
                        onPress={() => setCaloriesPerOz(prevState => !prevState)}
                        style={[styles.button, caloriesPerOz ? styles.pressed : styles.unpressed]}>
                        <AppText>
                            <Text style={{ fontSize: '12px' }}>
                                {caloriesPerOz ? "Per Oz" : "Per Oz"}
                            </Text>
                        </AppText>
                    </Pressable>

                </View>

                <InputWithlabel label="Bottle Size (oz)">
                    <CustomTextInput inputMode='decimal' onChangeText={value => setBottleSizeOz(value)} />
                </InputWithlabel>

                <InputWithlabel label="Body Weight (kg)">
                    <CustomTextInput inputMode='decimal' onChangeText={value => setBodyWeight(value)} />
                </InputWithlabel>

            </View>

            <View style={{ margin: '10px' }}>
                {calories > 0
                    ? <View>
                        <View style={{ padding: '4px', alignSelf: 'center' }}>
                            <MixingRatioString cups={ratios.cups} scoops={ratios.scoops} tbsps={ratios.tbsps} tsps={ratios.tsps} calories={ratios.calories} />
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
                calorieTarget={calorieTarget}
                displacement={displacement}
                bottleSizeOz={bottleSizeOz}
                protein={protein}
                bodyweight={bodyWeight}
                expanded={showMoreDetail}
            />

            <View style={{ flexDirection: 'row', padding: '12px' }}>
                <Pressable
                    onPress={() => setShowmMoreDetail(prevState => !prevState)}
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
        padding: '8px',
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
