import { Redirect, Slot, Stack, router } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { lightTheme } from "../shared/lightTheme";
import { SessionContext } from "../contexts/SesionContext";
import { useContext, useLayoutEffect, useState } from "react";
import { LoginResponse, Module } from "../interfaces/login";
import { useColorScheme } from "react-native";
import { darkTheme } from "../shared/darkTheme";

const _layout = () => {
  const [loginData, setLoginData] = useState<LoginResponse | undefined>();
  const [menuItems, setMenuItems] = useState<Module[]>([]);
  const colorScheme = useColorScheme();

  useLayoutEffect(() => {
    if (loginData) router.push("/(drawer)/home");
  }, [loginData]);
  return (
    <>
      <SessionContext.Provider
        value={{ loginData, setLoginData, menuItems, setMenuItems }}
      >
        <PaperProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(public)"
              options={{
                headerShown: false,
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
          </Stack>
        </PaperProvider>
      </SessionContext.Provider>
    </>
  );
};
export default _layout;
