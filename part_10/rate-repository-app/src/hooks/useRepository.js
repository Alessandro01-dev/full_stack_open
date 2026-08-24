import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
    skip: !id,
  });

  const repository = data ? data.repository : undefined;

  return { repository, loading };
};

export default useRepository;