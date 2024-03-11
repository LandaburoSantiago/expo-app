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
      <Drawer.Screen
        options={{ ...screenOptionsDrawer, title: "Time planning" }}
      />

      <View style={styles.timePlanningPage}>
        <Text variant="headlineMedium">Time planning</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timePlanningPage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
export default Page;
