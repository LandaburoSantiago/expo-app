import { useContext } from "react";
import AvatarMenu from "../../Components/AvatarMenu";
import { Module } from "../../interfaces/login";
import { lightTheme } from "../lightTheme";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useColorScheme } from "react-native";
import { darkTheme } from "../darkTheme";

const useScreenOptionsDrawer = ({ menuItems }: { menuItems: Module[] }) => {
  const colorScheme = useColorScheme();
  const screenOptionsDrawer = {
    headerShown: true,
    swipeEdgeWidth: 0,
    drawerActiveTintColor: lightTheme.colors.primary,
    headerRight: () => (
      <>
        <AvatarMenu routes={menuItems} />
      </>
    ),
    headerLeft: () => (
      <DrawerToggleButton
        tintColor={
          colorScheme === "light"
            ? lightTheme.colors.tertiary
            : darkTheme.colors.tertiary
        }
        pressColor={
          colorScheme === "light"
            ? lightTheme.colors.tertiaryContainer
            : darkTheme.colors.tertiaryContainer
        }
      />
    ),
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
  };

  const contentStyleTheming = {
    backgroundColor:
      colorScheme === "light"
        ? lightTheme.colors.surface
        : darkTheme.colors.surface,
  };

  return {
    screenOptionsDrawer,
    contentStyleTheming,
  };
};
export default useScreenOptionsDrawer;
