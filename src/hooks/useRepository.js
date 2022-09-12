import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ first, selectedOrder, searchKeyword }) => {
  const res = () => {
    if (selectedOrder === 'highest')
      return {
        first,
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
        searchKeyword,
      };
    if (selectedOrder === 'lowest')
      return {
        first,
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
        searchKeyword,
      };
    else
      return {
        first,
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
        searchKeyword,
      };
  };
  const variables = res();

  const {
    data = {},
    loading,
    fetchMore,
    ...result
  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const { repositories } = data;

  return { repositories, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;
