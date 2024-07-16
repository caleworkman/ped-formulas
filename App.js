import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';

import data from './assets/formulas.json';

export default function App() {

  const [selectedFormulaIdx, setSelectedFormulaIdx] = useState();

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>Select a Formula</Text>
      <StatusBar style="auto" />

      <Picker selectedValue={selectedFormulaIdx} onValueChange={idx => setSelectedFormulaIdx(idx)}>
        {data.formulas.map((x, idx) => <Picker.Item key={x.uuid} label={x.name} value={idx} />)}
      </Picker>

      <p>
        {data.formulas[selectedFormulaIdx]?.name}
      </p>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
