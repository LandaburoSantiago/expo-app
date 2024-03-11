import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { lightTheme } from "../../../shared/lightTheme";
import { darkTheme } from "../../../shared/darkTheme";
import useScreenOptionsDrawer from "../../../shared/hooks/useScreenOptionsDrawer";

const MarvelCharactersLayout = () => {
  const { contentStyleTheming } = useScreenOptionsDrawer({ menuItems: [] });
  return (
    <Stack screenOptions={{ contentStyle: { ...contentStyleTheming } }}></Stack>
  );
};

export default MarvelCharactersLayout;
