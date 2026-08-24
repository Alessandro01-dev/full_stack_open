import { View, Image, StyleSheet, Pressable, Linking } from "react-native";
import theme from "../../theme";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  topSection: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flexShrink: 1,
    alignItems: "flex-start",
  },
  fullNameText: {
    marginBottom: 4,
  },
  descriptionText: {
    marginBottom: 4,
  },
  languageBadge: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  languageText: {
    color: theme.colors.white,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    marginTop: 4,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 15,
  },
  githubButtonText: {
    color: theme.colors.white,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const StatColumn = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold">{formatCount(value)}</Text>
    <Text color="textSecondary" style={styles.statLabel}>
      {label}
    </Text>
  </View>
);

const RepositoryItem = ({ item, showGithubButton = false  }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topSection}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />

        <View style={styles.infoContainer}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            style={styles.fullNameText}
          >
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.descriptionText}>
            {item.description}
          </Text>

          <View style={styles.languageBadge}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <StatColumn label="Stars" value={item.stargazersCount} />
        <StatColumn label="Forks" value={item.forksCount} />
        <StatColumn label="Reviews" value={item.reviewCount} />
        <StatColumn label="Rating" value={item.ratingAverage} />
      </View>

      {showGithubButton && (
        <Pressable
          style={styles.githubButton}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text fontWeight="bold" style={styles.githubButtonText}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
