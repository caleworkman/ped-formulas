import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

import AppText from '../components/appText.js';
import { MY_BLUE, MY_WHITE } from '../assets/constants.js';


export default function Header() {

    return (
        <View style={styles.container}>
            <Link style={styles.link} href='/'><AppText>SOLVER</AppText></Link>
            <Link style={styles.link} href='/list'><AppText>LIST</AppText></Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MY_BLUE, 
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 12,
        width: '100%'
    },
    link: {
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 20, 
        fontWeight: 'bold',
        color: MY_WHITE

    }
  });