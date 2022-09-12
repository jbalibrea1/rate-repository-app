import { useQuery } from '@apollo/client';
import { AUTHORIZE } from '../graphql/queries';

const useMyReviews = ({ includeReviews }) => {
  const variables = { includeReviews };

  const {
    data = {},
    loading,
    refetch,
    ...result
  } = useQuery(AUTHORIZE, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const { me } = data;
  return { me, loading, refetch, ...result };
};

export default useMyReviews;
