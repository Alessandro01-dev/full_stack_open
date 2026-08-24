import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";
import { Link } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client/react";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 15,
    paddingBottom: 15,
    backgroundColor: theme.colors.appBarBg,
  },
  scrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  tab: {
    marginRight: 20,
  },
  tabText: {
    color: theme.colors.white,
  },
});

const AppBarTab = ({ children, to }) => {
  return (
    <Link to={to} style={styles.tab}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.tabText}>
        {children}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: false },
  });

  const user = data ? data.me : null;

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        <AppBarTab to="/">Repositories</AppBarTab>
        {user && <AppBarTab to="/review">Create a review</AppBarTab>}
        {user && <AppBarTab to="/myreviews">My reviews</AppBarTab>}
        {user ? (
          <Pressable onPress={handleSignOut} style={styles.tab}>
            <Text
              fontWeight="bold"
              fontSize="subheading"
              style={styles.tabText}
            >
              Sign out
            </Text>
          </Pressable>
        ) : (
          <>
            <AppBarTab to="/signin">Sign in</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
