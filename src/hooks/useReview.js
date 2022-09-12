import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';

const useReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createNewReview = async ({
    ownerName,
    repositoryName,
    rating,
    text,
  }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating: parseInt(rating),
          text,
        },
      },
    });
    apolloClient.resetStore();
    return data;
  };

  return [createNewReview, result];
};

export default useReview;
