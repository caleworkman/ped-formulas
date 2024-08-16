import { Picker } from '@react-native-picker/picker'
import { useState, useEffect } from 'react';
import { View } from 'react-native';

import CustomPicker from '../components/customPicker.js';
import InputWithLabel from '../components/inputWithLabel.js';

import data from '../assets/formulaDetails.json';


const FormulaPicker = (props) => {

    const brands = [...new Set(Object.values(data.formulas).map(f => f.brand))];
    brands.sort()
    const defaultBrandIdx = brands.indexOf(props.defaultBrandName) ?? 0

    const [selectedBrandIdx, setSelectedBrandIdx] = useState(defaultBrandIdx);

    const selectedBrand = brands[selectedBrandIdx];

    // Add a dummy value that's blank so the parent won't appear to have no values
    let formulas = selectedBrand ? data.formulas.filter(f => f.brand == selectedBrand) : data.formulas;
    formulas.sort((a, b) => a.name.localeCompare(b.name));

    const defaultFormulaIdx = formulas.map(f => f.uuid).indexOf(props.defaultFormulaUuid)

    useEffect(() => {
        props.onValueChange(formulas[defaultFormulaIdx])
    }, [props.defaultFormulaUuid])

    useEffect(() => {
        props.onValueChange(formulas[0])
    }, [selectedBrandIdx])

    return (
        <View>
            <InputWithLabel label="Brand">
                <CustomPicker selectedValue={selectedBrandIdx} onValueChange={idx => setSelectedBrandIdx(idx)} >
                    {brands.map((x, idx) => <Picker.Item key={x + idx} label={x} value={idx} />)}
                </CustomPicker>
            </InputWithLabel>

            <InputWithLabel label="Formula">
                <CustomPicker 
                    defaultValue={defaultFormulaIdx}
                    onValueChange={idx => props.onValueChange(formulas[idx])}
                >
                    {formulas.map((x, idx) => 
                        <Picker.Item 
                            key={x.uuid} 
                            label={x.name} 
                            value={idx} 
                        />)}
                </CustomPicker>
            </InputWithLabel>
        </View>
    )
}

export default FormulaPicker;

