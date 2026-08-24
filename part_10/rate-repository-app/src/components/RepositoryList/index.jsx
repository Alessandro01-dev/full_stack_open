import { FlatList, View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import theme from "../../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  searchInput: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    fontSize: theme.fontSizes.body,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ORDERING_OPTIONS = {
  LATEST: {
    label: "Latest repositories",
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  HIGHEST_RATED: {
    label: "Highest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  LOWEST_RATED: {
    label: "Lowest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};

export const RepositoryListContainer = ({
  repositories,
  selectedOrdering,
  onOrderingChange,
  searchKeyword,
  onSearchKeywordChange,
  loading,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const listHeader = (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories..."
        value={searchKeyword}
        onChangeText={onSearchKeywordChange}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOrdering}
          onValueChange={onOrderingChange}
        >
          {Object.entries(ORDERING_OPTIONS).map(([key, { label }]) => (
            <Picker.Item key={key} label={label} value={key} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const listEmpty = (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text>{loading ? "Loading..." : "No repositories found"}</Text>
    </View>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ListEmptyComponent={listEmpty}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={listHeader}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrdering, setSelectedOrdering] = useState("LATEST");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { orderBy, orderDirection } = ORDERING_OPTIONS[selectedOrdering];

  const { repositories, loading } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrdering={selectedOrdering}
      onOrderingChange={setSelectedOrdering}
      searchKeyword={searchKeyword}
      onSearchKeywordChange={setSearchKeyword}
      loading={loading}
    />
  );
};

export default RepositoryList;