import { FlatList, View, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository(id, { first: 3 });

  if (loading) {
    return null;
  }

  if (!repository) {
    return null;
  }

  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showGithubButton />
      )}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;