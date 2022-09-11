import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },

  text: {
    color: '#FFF',
    padding: 5,
    paddingHorizontal: 20,
  },
  scroll: {
    paddingBottom: 15,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signIn">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
