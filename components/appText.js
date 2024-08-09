import { Text } from 'react-native';
import { MY_WHITE } from '../assets/constants.js';

const AppText = ({ children }) => {
  return (
    <Text
      style={{
        fontSize: 16,
        color: MY_WHITE,
        fontFamily: 'Helvetica'
      }}>
      {children}
    </Text>
  );
};

export default AppText;