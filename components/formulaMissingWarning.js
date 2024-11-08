import { Text, View } from 'react-native';
import AppText from '../components/appText.js';
import { MY_RED } from '../assets/constants.js';

const FormulaMissingWarning = (props) => {

    const formula = props.formula;

    const missing = [];
    if (typeof(formula.cup.calories) != 'number') {
        missing.push('cup');
    }
    if (typeof(formula.scoop.calories) != 'number') {
        missing.push('scoop');
    }
    if (typeof(formula.tbsp.calories) != 'number') {
        missing.push('tbsp');
    }
    if (typeof(formula.tsp.calories) != 'number') {
        missing.push('tsp');
    }
    if (typeof(formula.g_protein_per_100_cal) != 'number') {
        missing.push('protein');
    }

    if (missing === undefined || missing.length == 0) {
        return (<></>)
    }

    return (
        <View style={{ 
            padding: '3px', 
            marginTop: '2px', 
            alignSelf: 'center', 
            border: 'solid 1px', 
            borderRadius: '4px', 
            backgroundColor: MY_RED }}>
            
            <AppText>
                <Text style={{ fontSize: "14px" }}>Formula is missing: </Text>
                <Text style={{ fontWeight: 'bold', fontSize: "14px" }}>
                    {missing.join(', ')}
                </Text>
            </AppText>
        </View>
    )
}

export default FormulaMissingWarning;