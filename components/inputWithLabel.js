import { StyleSheet, View, Text } from 'react-native';
import { MY_WHITE } from '../assets/constants.js';

const InputWithLabel = (props) => {

    return (
        <View style={[styles.baseStyle, props.oneLine ? styles.oneLine : styles.twoLine]}>

            <Text style={[styles.label, props.oneLine ? styles.oneLineLabel : '']}>
                {props.label}
            </Text>

            <View>
                {props.children}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    baseStyle: {
        paddingTop: '4px',
        paddingBottom: '4px',
    },
    twoLine: {

    },
    oneLine: {
        display: "flex",
        flexDirection: "row",
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: MY_WHITE,
        fontFamily: 'Helvetica',
        paddingBottom: 4,
        paddingLeft: 0
    },
    oneLineLabel: {
        alignContent: "center",
        width: "70px",
    }
})

export default InputWithLabel