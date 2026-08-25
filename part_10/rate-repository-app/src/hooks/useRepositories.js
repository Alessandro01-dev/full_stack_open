import { useQuery } from "@apollo/client/react";
import { NetworkStatus } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, fetchMore, networkStatus, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      variables,
    },
  );

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

  const fetchingMore = networkStatus === NetworkStatus.fetchMore;

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    fetchingMore,
    ...result,
  };
};

export default useRepositories;