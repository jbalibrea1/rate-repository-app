import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'column',
    width: '100%',
    flexShrink: 1,
  },
  headerText: {
    paddingVertical: 8,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  alignCenter: {
    textAlign: 'center',
  },
  img: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 10,
  },
  language: {
    backgroundColor: theme.colors.primary,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
});

const parseThousands = (value) => {
  return value >= 1000 ? `${Math.round(value / 100) / 10}k` : String(value);
};

const RepositoryHeader = ({ item }) => {
  return (
    <View style={styles.header}>
      <Image style={styles.img} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.headerContainer}>
        <Text fontWeight="bold">{item.fullName}</Text>
        <Text style={styles.headerText}>{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container} t>
      <RepositoryHeader item={item} />
      <View style={styles.stats}>
        <View>
          <Text style={styles.alignCenter} fontWeight="bold">
            {parseThousands(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View>
          <Text style={styles.alignCenter} fontWeight="bold">
            {parseThousands(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View>
          <Text style={styles.alignCenter} fontWeight="bold">
            {item.reviewCount}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View>
          <Text style={styles.alignCenter} fontWeight="bold">
            {item.ratingAverage}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
