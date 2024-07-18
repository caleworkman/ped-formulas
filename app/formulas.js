import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';
import data from '../assets/formulaDetails.json';

export default function Formulas() {

  const [selectedBrand, setSelectedBrand] = useState();

  const brands = [...new Set(Object.values(data.formulas).map(f => f.brand))]

  const formulas = selectedBrand ? data.formulas.filter(f => f.brand == selectedBrand) : data.formulas 

  return (
    <View style={styles.container}>

      <Picker selectedValue={selectedBrand} onValueChange={brand => setSelectedBrand(brand)}>
        {brands.map((brand, idx) => <Picker.Item key={idx} label={brand} value={brand} />)}
      </Picker>

      <table>
        <thead>
          <tr style={styles.headerRow}>
            <th colSpan="3" style={styles.headerCell}></th>
            <th colSpan="3" style={styles.headerCell}>SCOOP</th>
            <th colSpan="3" style={styles.headerCell}>CUP</th>
            <th colSpan="3" style={styles.headerCell}>TBSP</th>
            <th colSpan="3" style={styles.headerCell}>TSP</th>
          </tr>
          <tr style={styles.headerRow}>
            <th style={styles.headerCell}>Name</th>
            <th style={styles.headerCell}>Brand</th>
            <th style={styles.headerCell}>Protein (g) / 100 Cal</th>
            <th style={styles.headerCell}>cal</th>
            <th style={styles.headerCell}>g</th>
            <th style={styles.headerCell}>disp</th>
            <th style={styles.headerCell}>cal</th>
            <th style={styles.headerCell}>g</th>
            <th style={styles.headerCell}>disp</th>
            <th style={styles.headerCell}>cal</th>
            <th style={styles.headerCell}>g</th>
            <th style={styles.headerCell}>disp</th>
            <th style={styles.headerCell}>cal</th>
            <th style={styles.headerCell}>g</th>
            <th style={styles.headerCell}>disp</th>
          </tr>
        </thead>

        <tbody>
            {formulas.map((formula, idx) => {
          
              const dataRow = (idx % 2 == 0) ? "dataRowEven" : "dataRowOdd"

              return (
                <tr key={formula.uuid} style={styles[dataRow]}>
                  <td style={styles.dataCellName}>{formula.name}</td>
                  <td style={styles.dataCell}>{formula.brand}</td>
                  <td style={styles.dataCell}>{formula.g_protein_per_100_cal}</td>
                  {["scoop", "cup", "tbsp", "tsp"].map(unit => {
                    return (
                      <>
                        <td key="1" style={styles.dataCell}>{formula.units[unit].calories}</td>
                        <td key="2" style={styles.dataCell}>{formula.units[unit].grams}</td>
                        <td key="3" style={styles.dataCell}>{formula.units[unit].displacement}</td>
                      </>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>

      </table>

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
      color: "white",
      fontFamily: "Helvetica"
    },
    headerRow: {
      backgroundColor: "#3182bd",
    },
    headerCell: {
      padding: 2
    },
    dataRowEven: {
      border: "1px solid",
      backgroundColor: "#9ecae1",
      color: "black",
    },
    dataRowOdd: {
      border: "1px solid",
      color: "black",
      backgroundColor: "#deebf7",
    },
    dataCellName: {
      padding: 2,
    },
    dataCell: {
      padding: 2,
      textAlign: "center"
    }
  });