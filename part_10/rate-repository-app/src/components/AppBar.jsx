import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
