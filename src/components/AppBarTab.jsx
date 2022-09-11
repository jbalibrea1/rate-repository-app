import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
    padding: 5,
    paddingHorizontal: 20,
  },
});

const AppBarTab = ({ children, to, onPress }) => {
  return (
    <Link to={to} component={TouchableWithoutFeedback}>
      <Text fontWeight="bold" style={styles.text} onPress={onPress}>
        {children}
      </Text>
    </Link>
  );
};

export default AppBarTab;
