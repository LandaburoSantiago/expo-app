import { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import { SessionContext } from "../../../../contexts/SesionContext";
import useScreenOptionsDrawer from "../../../../shared/hooks/useScreenOptionsDrawer";

const Page = () => {
  const { menuItems } = useContext(SessionContext);
  const { screenOptionsDrawer } = useScreenOptionsDrawer({ menuItems });
  return (
    <>
      <Drawer.Screen
        options={{ ...screenOptionsDrawer, title: "Time dashboard" }}
      />

      <View style={styles.timeDashboardPage}>
        <Text variant="headlineMedium">Time dashboard</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  timeDashboardPage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
export default Page;
