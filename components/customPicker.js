import { Picker } from '@react-native-picker/picker'

const CustomPicker = ({ children, ...rest}) => {

    return (
        <Picker 
            {...rest}
            style={{
                padding: '4px', 
                borderRadius: '4px'
            }}
        >
            {children}
        </Picker>
    )
}

export default CustomPicker