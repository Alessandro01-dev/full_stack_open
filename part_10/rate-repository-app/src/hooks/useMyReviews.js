import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";

const useMyReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  const reviews = data?.me?.reviews;

  return { reviews, loading, refetch };
};

export default useMyReviews;