import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import useScreenOptionsDrawer from "../../../../shared/hooks/useScreenOptionsDrawer";
import { useContext } from "react";
import { SessionContext } from "../../../../contexts/SesionContext";

const Page = () => {
  const { menuItems } = useContext(SessionContext);
  const { screenOptionsDrawer } = useScreenOptionsDrawer({ menuItems });
  return (
    <>
      <Drawer.Screen
        options={{ ...screenOptionsDrawer, title: "Novelty audits" }}
      />

      <View style={styles.noveltiesAuditsPage}>
        <Text variant="headlineMedium">Novelty audits</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  noveltiesAuditsPage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
export default Page;
