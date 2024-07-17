import { StyleSheet, View } from 'react-native';

const FormulaDetailsView = (props) => {

    console.log(props.units)

    return (
        <View styles={styles.container}>
            <h1>{props.name}</h1>
            <h2>{props.brand}</h2>

            <table>
                <thead>
                    <tr>
                        <th>units</th>
                        <th>calories</th>
                        <th>grams</th>
                        <th>displacement</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(props.units).map(key => {
                        return (
                            <tr key={props.uuid}>
                                <td>{key}</td>
                                <td>{props.units[key].calories}</td>
                                <td>{props.units[key].grams}</td>
                                <td>{props.units[key].displacement}</td>
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
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'solid black 5px'
    },
  });

export default FormulaDetailsView