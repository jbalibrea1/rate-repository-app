import { View, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import useMyReviews from '../hooks/useMyReviews';
import useDeleteReview from '../hooks/useDeleteReview.js';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flexShrink: 1,
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
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexShrink: 1,
    marginTop: 15,
  },
});

const MyReviewItem = ({ review, navigate, refetch }) => {
  const [deleteReview] = useDeleteReview();

  const deleteReviewAlert = () =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteReview(review.id);
            refetch();
          },
        },
      ]
    );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
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
      <View style={styles.buttonRow}>
        <Button
          title="View repository"
          onPress={() => navigate(`/${review.repositoryId}`)}
        />
        <Button title="Delete review" color="red" onPress={deleteReviewAlert} />
      </View>
    </View>
  );
};

const ReviewList = () => {
  const { me, loading, refetch } = useMyReviews({ includeReviews: true });
  let navigate = useNavigate();

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  const reviews = me ? me.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <MyReviewItem review={item} navigate={navigate} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ReviewList;
