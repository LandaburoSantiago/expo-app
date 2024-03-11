import { Image, StyleSheet, View, useColorScheme } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  Modal,
  Portal,
  Searchbar,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import { SessionContext } from "../../../contexts/SesionContext";
import { useContext, useEffect, useRef, useState } from "react";
import useScreenOptionsDrawer from "../../../shared/hooks/useScreenOptionsDrawer";
import { Character } from "../../../interfaces/character";
import { Page } from "../../../interfaces/pagination";
import { getPaginationParams } from "../../../shared/getPaginationParams";
import { characters } from "../../../api/services/marvel/characters";
import { lightTheme } from "../../../shared/lightTheme";
import { ScrollView } from "react-native";
import { darkTheme } from "../../../shared/darkTheme";

const ITEMS_PER_PAGE = 10;
const pageInitial: Page = {
  itemsPage: 1,
  hasMoreItems: true,
};
const MarvelPage = () => {
  const dataFetchedRef = useRef<boolean>(false);
  const { menuItems } = useContext(SessionContext);
  const [charactersData, setCharactersData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Page>(pageInitial);
  const [search, setSearch] = useState<string>("");
  const [modalCharacterVisible, setModalCharacterVisible] =
    useState<boolean>(false);
  const [characterToModal, setCharacterToModal] = useState<Character>();
  const colorScheme = useColorScheme();

  const { screenOptionsDrawer } = useScreenOptionsDrawer({ menuItems });

  const getCharacters = async (params?: {
    initialRequest?: boolean;
    resetSearch?: boolean;
  }) => {
    try {
      if (params?.initialRequest) {
        setLoading(true);
        setPagination(pageInitial);
      } else {
        setLoadingLoadMore(true);
      }
      if (params?.resetSearch) {
        setSearch("");
      }

      const { limit, offset } = getPaginationParams(
        ITEMS_PER_PAGE,
        params?.initialRequest ? 1 : pagination.itemsPage
      );

      const response = await characters({
        limit,
        offset,
        name: search && !params?.resetSearch ? search : undefined,
      });
      if (params?.initialRequest) {
        setCharactersData(response.data?.results || []);
        setLoading(false);
      } else {
        setCharactersData([
          ...charactersData,
          ...(response.data?.results || []),
        ]);
        setLoadingLoadMore(false);
      }
      setPagination((oldState) => {
        const newState: Page = JSON.parse(JSON.stringify(oldState));
        newState.hasMoreItems = response.data?.results
          ? response.data.results.length >= ITEMS_PER_PAGE
          : true;
        newState.itemsPage++;
        return newState;
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (dataFetchedRef.current) return;
    getCharacters({ initialRequest: true });
  }, []);
  return (
    <>
      <Drawer.Screen
        options={{ ...screenOptionsDrawer, title: "Marvel characters" }}
      />
      {loading ? (
        <>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={"large"} />
          </View>
        </>
      ) : (
        <View style={styles.charactersPage}>
          <>
            <Searchbar
              style={styles.searchBar}
              placeholder="Search"
              onChangeText={setSearch}
              value={search}
              onEndEditing={() => {
                getCharacters({ initialRequest: true });
              }}
              onClearIconPress={() => {
                setSearch("");
                getCharacters({ initialRequest: true, resetSearch: true });
              }}
            />
            {charactersData.length ? (
              <>
                <ScrollView>
                  <View style={styles.charactersList}>
                    {charactersData.map((ele) => (
                      <TouchableRipple
                        onPress={() => {
                          setModalCharacterVisible(true);
                          setCharacterToModal(ele);
                        }}
                        rippleColor="rgba(0, 0, 0, .32)"
                      >
                        <Card key={ele.id}>
                          {ele.thumbnail ? (
                            <>
                              <Card.Cover
                                source={{
                                  uri: `${ele.thumbnail.path}.${ele.thumbnail.extension}`,
                                }}
                              />
                            </>
                          ) : null}
                          <Card.Title title={`${ele.name}`} />
                          <Card.Content>
                            <Text variant="bodyMedium">{`${ele.description}`}</Text>
                          </Card.Content>
                        </Card>
                      </TouchableRipple>
                    ))}
                    {loadingLoadMore ? (
                      <>
                        <ActivityIndicator size={"small"} />
                      </>
                    ) : (
                      <>
                        {pagination.hasMoreItems ? (
                          <>
                            <Button
                              onPress={() => {
                                getCharacters({
                                  initialRequest: false,
                                });
                              }}
                            >
                              More
                            </Button>
                          </>
                        ) : (
                          <>
                            <View style={styles.dontHaveMoreItemsContainer}>
                              <Text variant="labelLarge">
                                {" "}
                                No more characters to load
                              </Text>
                            </View>
                          </>
                        )}
                      </>
                    )}
                  </View>
                </ScrollView>
              </>
            ) : (
              <>
                <View style={styles.charactersWasNotFound}>
                  <Text variant="titleMedium">No characters found</Text>
                </View>
              </>
            )}
          </>
        </View>
      )}
      <Portal>
        <Modal
          visible={modalCharacterVisible}
          style={styles.modalCharacterContainer}
          contentContainerStyle={{
            ...styles.modalCharacterContentContainer,
            backgroundColor:
              colorScheme === "light"
                ? lightTheme.colors.surface
                : darkTheme.colors.surface,
          }}
          onDismiss={() => setModalCharacterVisible(false)}
        >
          {characterToModal ? (
            <>
              <View
                style={styles.modalContentCharacterInfoContainer}
                key={characterToModal.id}
              >
                <Image
                  style={styles.modalCharacterImage}
                  source={{
                    uri: `${characterToModal.thumbnail?.path}.${characterToModal.thumbnail?.extension}`,
                  }}
                />
                <View style={styles.modalCharacterInfoContainer}>
                  <ScrollView style={styles.modalCharacterInfoContainerScroll}>
                    <Text variant="headlineSmall">{characterToModal.name}</Text>

                    <Text style={styles.textCharacter} variant="bodySmall">
                      {characterToModal.description}
                    </Text>
                    {characterToModal.comics?.items?.length ? (
                      <>
                        <Text style={styles.textCharacter} variant="titleLarge">
                          Comics
                        </Text>

                        <View style={styles.comicInfoContainer}>
                          {characterToModal.comics?.items?.map((ele) => (
                            <>
                              <Chip>{ele.name}</Chip>
                            </>
                          ))}
                        </View>
                      </>
                    ) : null}
                    {characterToModal.events?.items?.length ? (
                      <>
                        <Text style={styles.textCharacter} variant="titleLarge">
                          Events
                        </Text>

                        <View style={styles.comicInfoContainer}>
                          {characterToModal.events?.items?.map((ele) => (
                            <>
                              <Chip>{ele.name}</Chip>
                            </>
                          ))}
                        </View>
                      </>
                    ) : null}
                    {characterToModal.series?.items?.length ? (
                      <>
                        <Text style={styles.textCharacter} variant="titleLarge">
                          Series
                        </Text>

                        <View style={styles.comicInfoContainer}>
                          {characterToModal.series?.items?.map((ele) => (
                            <>
                              <Chip>{ele.name}</Chip>
                            </>
                          ))}
                        </View>
                      </>
                    ) : null}
                    {characterToModal.stories?.items?.length ? (
                      <>
                        <Text style={styles.textCharacter} variant="titleLarge">
                          Stories
                        </Text>

                        <View style={styles.comicInfoContainer}>
                          {characterToModal.stories?.items?.map((ele) => (
                            <>
                              <Chip>{ele.name}</Chip>
                            </>
                          ))}
                        </View>
                      </>
                    ) : null}
                  </ScrollView>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.errorLoadCharacterContainer}>
              <Text variant="titleMedium">
                {" "}
                There was an error when we loaded the character{" "}
              </Text>
            </View>
          )}
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  charactersPage: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  charactersList: {
    flexDirection: "column",
    height: "100%",
    gap: 16,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  listConfigurationContainer: {
    backgroundColor: lightTheme.colors.primaryContainer,
    padding: 32,
  },
  loadingContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dontHaveMoreItemsContainer: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  charactersWasNotFound: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: -24,
  },
  searchBar: {
    marginTop: 24,
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 24,
  },
  errorLoadCharacterContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  modalCharacterContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  modalCharacterContentContainer: {
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 650,
    width: "90%",
  },
  modalContentCharacterInfoContainer: {
    flexDirection: "row",
  },
  modalCharacterImage: {
    height: 650,
    width: "50%",
    resizeMode: "stretch",
  },
  modalCharacterInfoContainer: {
    padding: 8,
    width: "50%",
    height: 650,
  },
  modalCharacterInfoContainerScroll: {
    height: 650,
    flexDirection: "column",
    gap: 16,
  },
  textCharacter: {
    marginTop: 16,
  },
  comicInfoContainer: {
    marginTop: 8,
    gap: 8,
  },
});
export default MarvelPage;
