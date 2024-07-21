import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

import AppText from '../components/appText.js';


export default function Header() {

    return (
        <View style={styles.container}>
            <Link style={styles.link} href='/'><AppText>HOME</AppText></Link>
            <Link style={styles.link} href='/formulas'><AppText>LIST</AppText></Link>
            <Link style={styles.link} href='/solver'><AppText>SOLVER</AppText></Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#253494', 
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
        color: 'white'

    }
  });