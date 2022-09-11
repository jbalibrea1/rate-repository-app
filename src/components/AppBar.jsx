import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

import { useQuery } from '@apollo/client';
import { AUTHORIZE } from '../graphql/queries.js';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

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
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const { data } = useQuery(AUTHORIZE);
  const userLogged = data?.me?.username;

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {userLogged ? (
          <>
            <AppBarTab to="/" onPress={signOut}>
              Sign Out
            </AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab to="/signin">Sign in</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
