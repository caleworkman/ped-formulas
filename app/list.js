import { StyleSheet, View, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';
import data from '../assets/formulaDetails.json';
import AppText from '../components/appText.js';


export default function Formulas() {

  const [selectedBrand, setSelectedBrand] = useState();

  const brands = [...new Set(Object.values(data.formulas).map(f => f.brand))]

  const formulas = selectedBrand ? data.formulas.filter(f => f.brand == selectedBrand) : data.formulas

  return (
    <View style={styles.container}>

      <Picker selectedValue={selectedBrand} onValueChange={brand => setSelectedBrand(brand)}>
        {brands.map((brand, idx) => <Picker.Item key={idx} label={brand} value={brand} />)}
      </Picker>

      <table style={{borderCollapse: "collapse"}}>
        <thead style={{position: "sticky", top: 0}}>
          <tr style={styles.headerRow}>
            {['', "SCOOP", "CUP", "TBSP", "TSP"].map(x => {
              return (
                <th colSpan="3" style={styles.headerCell} key={x}><AppText>{x}</AppText></th>
              )
            })}
          </tr>
          <tr style={styles.headerRow}>
            {['Name', 'Brand', 'Protein (g) / 100 Cal'].concat(new Array(4).fill(['cal', 'g', 'disp']).flat()).map(x => {
              return (
                <th style={styles.headerCell}><AppText>{x}</AppText></th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {formulas.map((formula, idx) => {

            const dataRow = (idx % 2 == 0) ? "dataRowEven" : "dataRowOdd";

            return (
              <tr key={formula.uuid} style={styles[dataRow]}>
                <td style={styles.dataCellName}>{formula.name}</td>
                <td style={styles.dataCell}>{formula.brand}</td>
                <td style={styles.dataCell}>{formula.g_protein_per_100_cal}</td>
                {["scoop", "cup", "tbsp", "tsp"].map(unit => {
                  return (
                    <>
                      <td key={unit + "1"} style={styles.dataCell}>{formula.units[unit].calories}</td>
                      <td key={unit + "2"} style={styles.dataCell}>{formula.units[unit].grams}</td>
                      <td key={unit + "3"} style={styles.dataCell}>{formula.units[unit].displacement}</td>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: "white",
    fontFamily: "Helvetica",
    overflowY: 'scroll',
    width: '100%'
  },
  headerRow: {
    backgroundColor: "#3182bd",
  },
  headerCell: {
    padding: 4
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
    padding: 4,
    border: "solid #25292e 2px"
  },
  dataCell: {
    padding: 4,
    textAlign: "center",
    border: "solid #25292e 2px"
  }
});