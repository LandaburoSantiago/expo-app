import { View } from "react-native";
import { Text } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";
import useScreenOptionsDrawer from "../../../../shared/hooks/useScreenOptionsDrawer";
import { SessionContext } from "../../../../contexts/SesionContext";
import { useContext } from "react";

const Page = () => {
  const { menuItems } = useContext(SessionContext);
  const { screenOptionsDrawer } = useScreenOptionsDrawer({ menuItems });
  return (
    <>
      <Drawer.Screen options={{ ...screenOptionsDrawer, title: "Persons" }} />

      <View style={styles.personsPage}>
        <Text variant="headlineMedium">Persons</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  personsPage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
export default Page;
