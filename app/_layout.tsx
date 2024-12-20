import { Slot } from 'expo-router';
import { StyleSheet, ScrollView } from 'react-native';
import Header from "../components/header";

import { MY_GRAY } from '../assets/constants.js';

import FormulaContext from '../components/formulaContext.js';
import { useState } from 'react';

import { formulas } from '../assets/formulas';

export default function Layout() {

    const [formula, setFormula] = useState(formulas[0]);

    return (
        <ScrollView style={styles.container}>
            <Header />
            <FormulaContext.Provider value={{formula, setFormula}}>
              <Slot />
            </FormulaContext.Provider>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: MY_GRAY,
      // alignItems: 'center',
      // justifyContent: 'flex-start',
    }
  });