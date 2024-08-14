import { TextInput } from 'react-native';

const CustomTextInput = (props) => {

    const {styleProps, ...rest} = props

    return (
        <TextInput 
            {...rest}
            style={[props.style, {
                padding: '4px', 
                borderRadius: '4px',
                backgroundColor: 'white',
            }
        ]} />
    )
}

export default CustomTextInput;