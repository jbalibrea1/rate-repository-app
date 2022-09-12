import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();

  const deleteReview = async (deleteReviewId) => {
    const { data } = await mutate({
      variables: { deleteReviewId },
    });
    apolloClient.resetStore();
    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
