import { Text, View } from 'react-native';
import AppText from '../components/appText.js';
import { MY_RED } from '../assets/constants.js';

const ProteinWarning = (props) => {
    return (
        <View style={{ 
            padding: '6px', 
            marginTop: '4px', 
            alignSelf: 'center', 
            border: 'solid 1px', 
            borderRadius: '4px', 
            backgroundColor: MY_RED }}>
            
            <AppText>
                <Text style={{ fontWeight: 'bold' }}>
                    Protein concentration is greater than {props.protein_limit} g/kg
                </Text>
            </AppText>
        </View>
    )
}

export default ProteinWarning;