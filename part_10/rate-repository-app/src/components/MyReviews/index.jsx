import { FlatList, View, StyleSheet, Text } from "react-native";
import { useNavigate } from "react-router-native";
import ReviewItem from "./ReviewItem";
import useMyReviews from "../../hooks/useMyReviews";
import useDeleteReview from "../../hooks/useDeleteReview";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { reviews, loading, refetch } = useMyReviews();
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      await refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const listEmpty = (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text>{loading ? "Loading..." : "You haven't reviewed any repositories yet"}</Text>
    </View>
  );

  return (
    <FlatList
      data={reviewNodes}
      ListEmptyComponent={listEmpty}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewRepository={handleViewRepository}
          onDeleteReview={handleDeleteReview}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;