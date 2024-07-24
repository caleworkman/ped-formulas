import { StyleSheet, View } from 'react-native';
import AppText from '../components/appText.js';

const FormulaDetailsView = (props) => {

    return (
        <View styles={styles.container}>
            <h1><AppText>{props.name}</AppText></h1>
            <h2><AppText>{props.brand}</AppText></h2>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th><AppText>units</AppText></th>
                        <th><AppText>calories</AppText></th>
                        <th><AppText>grams</AppText></th>
                        <th><AppText>displacement</AppText></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(props.units).map(key => {
                        return (
                            <tr key={key + props.uuid}>
                                <td><AppText>{key}</AppText></td>
                                <td><AppText>{props.units[key].calories}</AppText></td>
                                <td><AppText>{props.units[key].grams}</AppText></td>
                                <td><AppText>{props.units[key].displacement}</AppText></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      border: 'solid black 5px',
    },
    table: {
        alignText: 'center'
    }
  });

export default FormulaDetailsView