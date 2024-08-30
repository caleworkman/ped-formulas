import { Picker } from '@react-native-picker/picker'
import { useState, useContext } from 'react';
import { View } from 'react-native';

import CustomPicker from './customPicker.js';
import InputWithLabel from './inputWithLabel.js';

import data from '../assets/formulaDetails.json';

import FormulaContext from './formulaContext.js';
import FormulaMissingWarning from '../components/formulaMissingWarning.js';



const FormulaPicker = () => {

    const { formula, setFormula } = useContext(FormulaContext);

    const brands = [...new Set(Object.values(data.formulas).map(f => f.brand))];
    brands.sort()

    const [brand, setBrand] = useState(formula ? formula.brand : brands[0]);

    let formulas = brand ? data.formulas.filter(f => f.brand == brand) : data.formulas;
    formulas.sort((a, b) => a.name.localeCompare(b.name));
    const formulaIds = formulas.map(f => f.uuid);

    function handleBrandChange(idx) {
        const brand = brands[idx]
        let formulas = data.formulas.filter(f => f.brand == brand);
        formulas.sort((a, b) => a.name.localeCompare(b.name));
        setBrand(brand)
        setFormula(formulas[0]);
    };

    return (
        <View>

            <InputWithLabel label="Brand">
                <CustomPicker defaultValue={brands.indexOf(brand)} onValueChange={handleBrandChange}>
                    {brands.map((x, idx) => 
                        <Picker.Item 
                            key={x + idx} 
                            label={x} 
                            value={idx} 
                        />)}
                </CustomPicker>
            </InputWithLabel>

            <InputWithLabel label="Formula">
                <CustomPicker defaultValue={formulaIds.indexOf(formula?.uuid)} onValueChange={idx => setFormula(formulas[idx])}>
                    {formulas.map((x, idx) =>
                        <Picker.Item
                            key={x.uuid}
                            label={x.name}
                            value={idx}
                        />)}
                </CustomPicker>
            </InputWithLabel>

            <FormulaMissingWarning formula={formula} />

        </View>
    )
}

export default FormulaPicker;

