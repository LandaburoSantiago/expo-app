import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import useScreenOptionsDrawer from "../../../shared/hooks/useScreenOptionsDrawer";
import { SessionContext } from "../../../contexts/SesionContext";
import { useContext } from "react";

const Page = () => {
  const { menuItems } = useContext(SessionContext);
  const { screenOptionsDrawer } = useScreenOptionsDrawer({ menuItems });
  return (
    <>
      <Drawer.Screen
        options={{ ...screenOptionsDrawer, title: "My Intelli" }}
      />

      <View style={styles.myintelliPage}>
        <Text variant="headlineMedium">My Intelli</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  myintelliPage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
export default Page;
