import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Header from "../components/header";

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
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
  });