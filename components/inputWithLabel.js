import { View, Text } from 'react-native';

const InputWithlabel = (props) => {

    return (
        <View style={{
            paddingTop: '4px',
            paddingBottom: '4px'
            }}>

            <Text style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: 'white',
                fontFamily: 'Helvetica',
                paddingBottom: 4,
                paddingLeft: 0
            }}>
                {props.label}
            </Text>

            <View>
                {props.children}
            </View>

        </View>
    )
}

export default InputWithlabel