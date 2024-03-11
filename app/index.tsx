import { Redirect } from "expo-router";
import { useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SesionContext";
import { ActivityIndicator, Text } from "react-native-paper";
import { Appearance, StyleSheet, View, useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";
import { lightTheme } from "../shared/lightTheme";
import { darkTheme } from "../shared/darkTheme";
const index = () => {
  const { loginData } = useContext(SessionContext);
  const colorScheme = useColorScheme();
  useEffect(() => {
    SecureStore.getItemAsync("themeMode")
      .then((themeMode) => {
        Appearance.setColorScheme(
          themeMode === "dark" || themeMode === "light" ? themeMode : "dark"
        );
      })
      .catch(() => {
        Appearance.setColorScheme("dark");
      });
  }, []);

  if (loginData?.user)
    return (
      <>
        <View
          style={{
            ...styles.indexContainer,
            backgroundColor:
              colorScheme === "light"
                ? lightTheme.colors.surface
                : darkTheme.colors.surface,
          }}
        >
          <ActivityIndicator size={"small"} />
          <Redirect href={"/(drawer)/home"} />
        </View>
      </>
    );
  return (
    <>
      <View
        style={{
          ...styles.indexContainer,
          backgroundColor:
            colorScheme === "light"
              ? lightTheme.colors.surface
              : darkTheme.colors.surface,
        }}
      >
        <ActivityIndicator size={"small"} />
        <Redirect href={"/(public)/login"} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  indexContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
export default index;
