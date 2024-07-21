import { Text } from 'react-native';

const AppText = ({children}) => {
    return (
      <Text style={{
        fontSize: 20, 
        color: 'white',
        fontFamily: 'Helvetica'}}>
          {children}
        </Text>
    );
  };

  export default AppText;