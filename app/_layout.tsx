import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Header from "../components/header";

import { MY_GRAY } from '../assets/constants.js';

export default function Layout() {
    return (
        <View style={styles.container}>
            <Header />
            <Slot />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: MY_GRAY,
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
  });