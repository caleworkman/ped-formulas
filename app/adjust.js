import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';

import data from '../assets/formulaDetails.json';
import { ML_TO_OZ, PROTEIN_LIMIT_G_PER_KG } from '../assets/constants.js';
import { MY_RED, MY_BLUE, MY_DARK_BLUE } from '../assets/constants.js';

import AppText from '../components/appText.js';
import InputWithLabel from '../components/inputWithLabel.js';
import CustomPicker from '../components/customPicker.js';
import CustomTextInput from '../components/customTextInput.js';


export default function App() {

    const [numScoops, setNumScoops] = useState(0);
    const [numCups, setNumCups] = useState(0);
    const [numTbsps, setNumTbsps] = useState(0);
    const [numTsps, setNumTsps] = useState(0);


    const [selectedFormulaIdx, setSelectedFormulaIdx] = useState(0);
    const [selectedBrandIdx, setSelectedBrandIdx] = useState(0);

    const brands = [...new Set(Object.values(data.formulas).map(f => f.brand))];
    const selectedBrand = selectedBrandIdx ? brands[selectedBrandIdx] : '';

    const formulas = selectedBrand ? data.formulas.filter(f => f.brand == selectedBrand) : data.formulas;
    const selectedFormula = formulas[selectedFormulaIdx]

    return (
        <View style={styles.container}>

            <View style={{
                margin: '10px',
                width: '300px',
            }}>

                <InputWithLabel label="Brand">
                    <CustomPicker selectedValue={selectedBrandIdx} onValueChange={idx => setSelectedBrandIdx(idx)} >
                        {brands.map((x, idx) => <Picker.Item key={x + idx} label={x} value={idx} />)}
                    </CustomPicker>
                </InputWithLabel>

                <InputWithLabel label="Formula">
                    <CustomPicker selectedValue={selectedFormulaIdx} onValueChange={idx => setSelectedFormulaIdx(idx)}>
                        {formulas.map((x, idx) => <Picker.Item key={x.uuid} label={x.name} value={idx} />)}
                    </CustomPicker>
                </InputWithLabel>

                <InputWithLabel label="Cups">
                    <CustomTextInput inputMode='decimal' onChangeText={value => setVolumeOz(value)} />
                </InputWithLabel>

                <InputWithLabel label="Scoops">
                    <CustomTextInput inputMode='decimal' onChangeText={value => setVolumeOz(value)} />
                </InputWithLabel>

                <InputWithLabel label="Tbsp">
                    <CustomTextInput inputMode='decimal' onChangeText={value => setVolumeOz(value)} />
                </InputWithLabel>

                <InputWithLabel label="Tsp">
                    <CustomTextInput inputMode='decimal' onChangeText={value => setVolumeOz(value)} />
                </InputWithLabel>


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
                displacementOz={displacementOz}
                volumeOz={volumeOz}
                protein={protein}
                acceptableProtein={acceptableProtein}
                bodyweight={bodyWeight}
                expanded={showMoreDetail}
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
