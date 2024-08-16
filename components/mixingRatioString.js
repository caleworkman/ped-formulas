import { Text, View } from 'react-native';
import AppText from './appText';

const MixingRatioString = (props) => {

    return (
        <AppText>
            <Text>Use </Text>

            <Text style={{ fontWeight: 'bold' }}>
                {props.numCups} cups,
            </Text>

            <Text style={{ fontWeight: 'bold' }}> {props.numScoops} scoops,</Text>

            <Text style={{ fontWeight: 'bold' }}> {props.numTbsps} tbsps,</Text>

            <Text> and</Text>
            <Text style={{ fontWeight: 'bold' }}> {props.numTsps} tsps.</Text>

        </AppText>
    )
}

export default MixingRatioString