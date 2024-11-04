import { Picker } from '@react-native-picker/picker'
import { useState, useContext } from 'react';
import { View } from 'react-native';

import CustomPicker from './customPicker.js';
import InputWithLabel from './inputWithLabel.js';
import { formulas } from '../assets/formulas';

import FormulaContext from './formulaContext.js';
import FormulaMissingWarning from '../components/formulaMissingWarning.js';



const FormulaPicker = () => {

    const { formula, setFormula } = useContext(FormulaContext);

    const brands = [...new Set(formulas.map(f => f.brand))];
    brands.sort()

    const [brand, setBrand] = useState(formula ? formula.brand : brands[0]);

    let formulasForBrand = brand ? formulas.filter(f => f.brand == brand) : formulas;
    formulasForBrand.sort((a, b) => a.name.localeCompare(b.name));
    const formulaIds = formulasForBrand.map(f => f.uuid);

    function handleBrandChange(idx) {
        const brand = brands[idx]
        let newFormulas = formulas.filter(f => f.brand == brand);
        newFormulas.sort((a, b) => a.name.localeCompare(b.name));
        setBrand(brand)
        setFormula(newFormulas[0]);
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
                <CustomPicker defaultValue={formulaIds.indexOf(formula?.uuid)} onValueChange={idx => setFormula(formulasForBrand[idx])}>
                    {formulasForBrand.map((x, idx) =>
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

