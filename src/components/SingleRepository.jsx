import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import useSingleRepository from '../hooks/useSingleRepository';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  ratingContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rating: {
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  info: {
    flexDirection: 'column',
    width: '100%',
    flexShrink: 1,
  },
  text: {
    marginTop: 5,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text fontWeight="bold" style={styles.rating}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.info}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.text} fontSize="subheading">
          {review.text}
        </Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const { repository, loading, fetchMore } = useSingleRepository({
    id,
    first: 2,
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} single={true} loading={loading} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
