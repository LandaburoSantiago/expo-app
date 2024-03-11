import { useContext, useState } from "react";
import { Appearance, View, useColorScheme } from "react-native";
import { Avatar, Button, Divider, Menu } from "react-native-paper";
import { Module } from "../interfaces/login";
import { router } from "expo-router";
import { moduleMapper } from "../shared/moduleMapper";
import * as SecureStore from "expo-secure-store";
import { SessionContext } from "../contexts/SesionContext";

const AvatarMenu = ({ routes }: { routes: Module[] }) => {
  const colorScheme = useColorScheme();
  const { setLoginData } = useContext(SessionContext);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  return (
    <View>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={() => openMenu()}>
            <Avatar.Icon
              size={24}
              icon="account"
              style={{
                marginRight: 16,
              }}
            />
          </Button>
        }
      >
        <Menu.Item
          key={"theme_switcher"}
          leadingIcon={
            colorScheme === "light" ? "moon-waning-crescent" : "sun-wireless"
          }
          title={colorScheme === "light" ? "Dark Mode" : "Light mode"}
          onPress={async () => {
            Appearance.setColorScheme(
              colorScheme === "light" ? "dark" : "light"
            );
            await SecureStore.setItemAsync(
              "themeMode",
              colorScheme === "light" ? "dark" : "light"
            );
          }}
        />
        {routes.length ? (
          <>
            {routes.map((ele) => (
              <Menu.Item
                key={ele.setting_module_config.key}
                onPress={() => {
                  router.replace(moduleMapper[ele.module].name);
                }}
                title={moduleMapper[ele.module].title}
              />
            ))}
          </>
        ) : null}
        <Divider />
        <Menu.Item
          leadingIcon={"logout"}
          onPress={async () => {
            await SecureStore.deleteItemAsync("token");
            setLoginData(undefined);
            router.replace("/");
          }}
          title="Logout"
        />
      </Menu>
    </View>
  );
};
export default AvatarMenu;
