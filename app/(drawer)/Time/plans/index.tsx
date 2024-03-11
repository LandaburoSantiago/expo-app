import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import useScreenOptionsDrawer from "../../../../shared/hooks/useScreenOptionsDrawer";
import { SessionContext } from "../../../../contexts/SesionContext";
import { useContext } from "react";

const Page = () => {
  const { menuItems } = useContext(SessionContext);
  const { screenOptionsDrawer } = useScreenOptionsDrawer({ menuItems });
  return (
    <>
      <Drawer.Screen options={{ ...screenOptionsDrawer, title: "Plans" }} />

      <View style={styles.plansPage}>
        <Text variant="headlineMedium">Plans</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  plansPage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
export default Page;
