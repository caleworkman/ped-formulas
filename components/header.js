import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';


export default function Header() {

    return (
        <View style={styles.container}>
            <Link style={styles.link} href='/'>Home</Link>
            <Link style={styles.link} href='/formulas'>List</Link>
            <Link style={styles.link} href='/solver'>Solver</Link>
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