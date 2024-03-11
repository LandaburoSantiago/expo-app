import { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { SessionContext } from "../../../../contexts/SesionContext";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import useScreenOptionsDrawer from "../../../../shared/hooks/useScreenOptionsDrawer";

const Page = () => {
  const { menuItems } = useContext(SessionContext);
  const { screenOptionsDrawer } = useScreenOptionsDrawer({ menuItems });
  return (
    <>
      <Drawer.Screen
        options={{
          ...screenOptionsDrawer,
          title: "Time dashboard attendances",
        }}
      />

      <View style={styles.dashboardAttendancePage}>
        <Text variant="headlineMedium">Time dashboard attendance</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  dashboardAttendancePage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
export default Page;
