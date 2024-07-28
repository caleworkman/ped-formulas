import { Text } from 'react-native';
import AppText from './appText';

const MixingRatioString = (props) => {

    return (
       <AppText>
            <Text>Use </Text>

            <Text style={{fontWeight: 'bold'}}>
                {props.cups} cups,
            </Text> 

            <Text style={{fontWeight: 'bold'}}> {props.scoops} scoops,</Text> 

            <Text style={{fontWeight: 'bold'}}> {props.tbsps} tbsps,</Text> 

            <Text> and</Text>
            <Text style={{fontWeight: 'bold'}}> {props.tsps} tsps.</Text> 

        </AppText>
    )
}

export default MixingRatioString