import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MY_WHITE, MY_DARK_BLUE } from '../assets/constants.js';

import AppText from '../components/appText.js';


const UnitSelector = (props) => {

    return (
        <View style={styles.container}>

            <View style={styles.leftChild}>
                <AppText>{props.displayName}</AppText>
            </View>

            <View style={styles.rightChild}>
                {props.options.map(x => {
                    const pressedStyle = props.selected == x ? styles.pressed : styles.unpressed
                    return (
                        <View style={styles.buttons} key={x}>
                            <Pressable 
                                onPress={() => props.onSelectOption(x)} 
                                style={[styles.button, pressedStyle]}>
                                    <Text style={pressedStyle}>{x}</Text>
                            </Pressable>
                        </View>
                    )
                })}
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    leftChild: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row'
    },
    rightChild: {
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttons: {
        padding: '4px'
    },
    button: {
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingRight: '8px',
        paddingLeft: '8px',
        borderRadius: '4px',
    },
    pressed: {
        backgroundColor: MY_DARK_BLUE,
        color: MY_WHITE
    },
    unpressed: {
        backgroundColor: 'white',
    }
})

export default UnitSelector;