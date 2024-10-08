import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

import AppText from '../components/appText.js';
import { MY_BLUE, MY_WHITE } from '../assets/constants.js';
import SettingsIcon from '../assets/settingsIcon';


export default function Header() {

    return (
        <View style={styles.container}>

            <View style={styles.left}>
                <Link style={styles.link} href='/'><AppText>SOLVE</AppText></Link>
                <Link style={styles.link} href='/adjust'><AppText>ADJUST</AppText></Link>
                <Link style={styles.link} href='/list'><AppText>FORMULAS</AppText></Link>
            </View>

            <View style={styles.right}>
                <Link style={styles.link} href='/settings'>
                <View style={styles.iconContainer}>
                    <SettingsIcon />
                </View></Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MY_BLUE, 
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        width: '100%'
    },
    left: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row'
    },
    right: {
        alignItems: 'flex-end',
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
    },
    link: {
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 20, 
        fontWeight: 'bold',
        color: MY_WHITE
    },
    iconContainer: {
        display: 'flex',
    }
  });