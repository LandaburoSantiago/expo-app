import { ScrollView, View, useColorScheme } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Searchbar,
  Text,
} from "react-native-paper";

import { StyleSheet } from "react-native";

import { lightTheme } from "../../../../shared/lightTheme";
import { Stack } from "expo-router";
import { devices } from "../../../../api/services/devices";
import { useEffect, useRef, useState } from "react";
import { Device } from "../../../../interfaces/devices";
import { Page } from "../../../../interfaces/pagination";
import { getPaginationParams } from "../../../../shared/getPaginationParams";
import useScreenOptionsDrawer from "../../../../shared/hooks/useScreenOptionsDrawer";
import { darkTheme } from "../../../../shared/darkTheme";
const ITEMS_PER_PAGE = 5;
const pageInitial: Page = {
  itemsPage: 1,
  hasMoreItems: true,
};
const DevicePage = () => {
  const dataFetchedRef = useRef<boolean>(false);
  const [devicesData, setDevicesData] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Page>(pageInitial);
  const [search, setSearch] = useState<string>("");
  const { contentStyleTheming } = useScreenOptionsDrawer({ menuItems: [] });
  const colorScheme = useColorScheme();

  const getDevices = async (params?: {
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

      const response = await devices({
        limit,
        offset,
        search:
          search && !params?.resetSearch ? search.replace(" ", ",") : undefined,
      });
      if (params?.initialRequest) {
        setDevicesData(response.data.results);
        setLoading(false);
      } else {
        setDevicesData([...devicesData, ...response.data.results]);
        setLoadingLoadMore(false);
      }
      setPagination((oldState) => {
        const newState: Page = JSON.parse(JSON.stringify(oldState));
        newState.hasMoreItems = response.data.results.length >= ITEMS_PER_PAGE;
        newState.itemsPage++;
        return newState;
      });
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    getDevices({ initialRequest: true });
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Devices",
          contentStyle: { ...contentStyleTheming },
          headerStyle: {
            backgroundColor:
              colorScheme === "light"
                ? lightTheme.colors.background
                : darkTheme.colors.background,
          },
          headerTintColor:
            colorScheme === "light"
              ? lightTheme.colors.tertiary
              : darkTheme.colors.tertiary,
        }}
      />
      {loading ? (
        <>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={"large"} />
          </View>
        </>
      ) : (
        <View style={styles.devicesPage}>
          <>
            <Searchbar
              style={styles.searchBar}
              placeholder="Search"
              onChangeText={setSearch}
              value={search}
              onEndEditing={() => {
                getDevices({ initialRequest: true });
              }}
              onClearIconPress={() => {
                setSearch("");
                getDevices({ initialRequest: true, resetSearch: true });
              }}
            />
            {devicesData.length ? (
              <>
                <ScrollView>
                  <View style={styles.devicesList}>
                    {devicesData.map((ele) => (
                      <Card key={ele.id_device}>
                        {ele.photo ? (
                          <>
                            <Card.Cover source={{ uri: ele.photo }} />
                          </>
                        ) : null}
                        <Card.Title title={`Nombre: ${ele.device_name}`} />
                        <Card.Content>
                          <Text variant="titleLarge">{`Modelo: ${ele.device_model}`}</Text>
                        </Card.Content>
                      </Card>
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
                                getDevices({
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
                                No more devices to load
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
                <View style={styles.devicesWasNotFounded}>
                  <Text variant="titleMedium"> No devices found</Text>
                </View>
              </>
            )}
          </>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  devicesPage: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  devicesList: {
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
  devicesWasNotFounded: {
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
});
export default DevicePage;
