import { View, StyleSheet, Pressable, Alert } from "react-native";
import { format } from "date-fns";
import theme from "../../theme";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  topRow: {
    flexDirection: "row",
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  infoContainer: {
    flexShrink: 1,
  },
  repositoryNameText: {
    marginBottom: 4,
  },
  dateText: {
    marginBottom: 4,
  },
  buttonsRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: theme.colors.white,
  },
});

const ReviewItem = ({ review, onViewRepository, onDeleteReview }) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDeleteReview(review.id),
        },
      ],
    );
  };

  return (
    <View style={styles.container} testID="reviewItem">
      <View style={styles.topRow}>
        <View style={styles.ratingContainer}>
          <Text fontWeight="bold" style={styles.ratingText}>
            {review.rating}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text fontWeight="bold" style={styles.repositoryNameText}>
            {review.repository.fullName}
          </Text>
          <Text color="textSecondary" style={styles.dateText}>
            {format(new Date(review.createdAt), "dd MMM yyyy")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      <View style={styles.buttonsRow}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={() => onViewRepository(review.repository.id)}
        >
          <Text fontWeight="bold" style={styles.buttonText}>
            View repository
          </Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text fontWeight="bold" style={styles.buttonText}>
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewItem;