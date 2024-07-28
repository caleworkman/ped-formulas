import { TextInput } from 'react-native';

const CustomTextInput = (props) => {

    return (
        <TextInput 
            {...props} 
            style={{
                padding: '4px', 
                borderRadius: '4px',
                backgroundColor: 'white',
        }} />
    )
}

export default CustomTextInput;