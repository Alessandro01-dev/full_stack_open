import { View, StyleSheet } from "react-native";
import { format } from "date-fns";
import theme from "../../theme";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
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
  usernameText: {
    marginBottom: 4,
  },
  dateText: {
    marginBottom: 4,
  },
});

const ReviewItem = ({ review, showRepositoryName = false }) => {
  return (
    <View style={styles.container} testID="reviewItem">
      <View style={styles.ratingContainer}>
        <Text fontWeight="bold" style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        {showRepositoryName ? (
          <Text fontWeight="bold" style={styles.usernameText}>
            {review.repository.fullName}
          </Text>
        ) : (
          <Text fontWeight="bold" style={styles.usernameText}>
            {review.user.username}
          </Text>
        )}
        <Text color="textSecondary" style={styles.dateText}>
          {format(new Date(review.createdAt), "dd MMM yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;