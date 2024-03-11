import { StyleSheet, View } from "react-native";
import { Divider, List, Text } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import { SessionContext } from "../../../contexts/SesionContext";
import { useContext } from "react";
import useScreenOptionsDrawer from "../../../shared/hooks/useScreenOptionsDrawer";

const Page = () => {
  const { menuItems } = useContext(SessionContext);
  const { screenOptionsDrawer } = useScreenOptionsDrawer({ menuItems });
  return (
    <>
      <Drawer.Screen
        options={{
          ...screenOptionsDrawer,
          title: "Home",
        }}
      />
      <View style={styles.homePage}>
        <Text variant="headlineMedium">Bienvenido a la Expo App</Text>
        <View>
          <Text variant="bodyLarge">
            Esta app tiene como objetivo demostrar conocimientos técnicos en
            React Native con Expo.
          </Text>
          <List.Section>
            <List.Item
              title={() => (
                <Text variant="bodyLarge">
                  {
                    "En el menu lateral Menu > Configurations > Devices se encuentra listado de dispositivos"
                  }
                </Text>
              )}
              left={() => <List.Icon icon={"information-outline"} />}
            />
            <List.Item
              title={() => (
                <Text variant="bodyLarge">
                  {
                    "En el menu lateral Menu > Marvel Characters se encuentra listado de superheroes de con su información"
                  }
                </Text>
              )}
              left={() => <List.Icon icon={"information-outline"} />}
            />
          </List.Section>
        </View>
        <Text variant="bodySmall">Hecho por Santiago Landaburo</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  homePage: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 16,
  },
});
export default Page;
