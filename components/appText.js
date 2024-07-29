import { Text } from 'react-native';

const AppText = ({ children }) => {
  return (
    <Text
      style={{
        fontSize: 16,
        color: 'white',
        fontFamily: 'Helvetica'
      }}>
      {children}
    </Text>
  );
};

export default AppText;