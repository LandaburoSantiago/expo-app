import { SessionContext } from "../../contexts/SesionContext";
import { useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { lightTheme } from "../../shared/lightTheme";
import { Module } from "../../interfaces/login";
import { PositionsModules } from "../../shared/enums-values";
import { moduleMapper } from "../../shared/moduleMapper";
import AvatarMenu from "../../Components/AvatarMenu";
import { useColorScheme } from "react-native";
import { darkTheme } from "../../shared/darkTheme";

const _layout = () => {
  const { loginData, setMenuItems } = useContext(SessionContext);
  const [drawerItemsUp, setDrawerItemsUp] = useState<Module[]>([]);
  const [drawerItemsCenter, setDrawerItemsCenter] = useState<Module[]>([]);
  const [drawerItemsDown, setDrawerItemsDown] = useState<Module[]>([]);
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (loginData) {
      setDrawerItemsUp(
        loginData.modules.filter(
          (ele) =>
            !!ele.setting_module_config &&
            ele.setting_module_config.position === PositionsModules.SidebarUp &&
            ele.is_render_mobile === 1
        )
      );
      setDrawerItemsCenter(
        loginData.modules.filter(
          (ele) =>
            !!ele.setting_module_config &&
            ele.setting_module_config.position ===
              PositionsModules.SidebarCenter &&
            ele.is_render_mobile === 1
        )
      );
      setDrawerItemsDown(
        loginData.modules.filter(
          (ele) =>
            !!ele.setting_module_config &&
            ele.setting_module_config.position ===
              PositionsModules.SidebarDown &&
            ele.is_render_mobile === 1
        )
      );
      setMenuItems(
        loginData.modules.filter(
          (ele) =>
            !!ele.setting_module_config &&
            ele.setting_module_config.position === PositionsModules.Header &&
            ele.is_render_mobile === 1
        )
      );
    }
  }, [loginData]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor:
                colorScheme === "light"
                  ? lightTheme.colors.background
                  : darkTheme.colors.background,
            },
            drawerInactiveTintColor:
              colorScheme === "light"
                ? lightTheme.colors.tertiary
                : darkTheme.colors.tertiary,
            drawerActiveTintColor:
              colorScheme === "light"
                ? lightTheme.colors.primary
                : darkTheme.colors.primary,
          }}
        >
          {drawerItemsUp.map((ele) => (
            <Drawer.Screen
              key={ele.setting_module_config.key}
              name={moduleMapper[ele.module].name}
              options={{
                drawerLabel: moduleMapper[ele.module].title,
                title: moduleMapper[ele.module].title,
              }}
            />
          ))}
          {drawerItemsCenter.map((ele) => (
            <Drawer.Screen
              key={ele.setting_module_config.key}
              name={moduleMapper[ele.module].name}
              options={{
                drawerLabel: moduleMapper[ele.module].title,
                title: moduleMapper[ele.module].title,
              }}
            />
          ))}

          {drawerItemsDown.map((ele) => (
            <Drawer.Screen
              key={ele.setting_module_config.key}
              name={moduleMapper[ele.module].name}
              options={{
                drawerLabel: moduleMapper[ele.module].title,
                title: moduleMapper[ele.module].title,
              }}
            />
          ))}
          <Drawer.Screen
            key={"marvel_characters"}
            name={"marvel_characters"}
            options={{
              title: "Marvel characters",
            }}
          />

          <Drawer.Screen
            key={"home"}
            name={"home"}
            options={{
              title: "Home",
              drawerItemStyle: {
                display: "none",
              },
            }}
          />
          <Drawer.Screen
            key={"time_dashboard"}
            name={"Time/dashboard"}
            options={{
              title: "Time dashboard",
              drawerLabel: "",
              drawerItemStyle: {
                display: "none",
              },
            }}
          />
          <Drawer.Screen
            key={"myintelli"}
            name={"myintelli"}
            options={{
              title: "My Intelli",
              drawerLabel: "",
              drawerItemStyle: {
                display: "none",
              },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
};

export default _layout;
