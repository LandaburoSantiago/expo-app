import { View, useColorScheme } from "react-native";
import { Divider, List, Text } from "react-native-paper";

import { Drawer } from "expo-router/drawer";

import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Module } from "../../../../interfaces/login";
import { SessionContext } from "../../../../contexts/SesionContext";
import { PositionsModules } from "../../../../shared/enums-values";
import { moduleMapper } from "../../../../shared/moduleMapper";
import { lightTheme } from "../../../../shared/lightTheme";
import { Link, router } from "expo-router";
import useScreenOptionsDrawer from "../../../../shared/hooks/useScreenOptionsDrawer";
import { darkTheme } from "../../../../shared/darkTheme";

const Page = () => {
  const { loginData, menuItems } = useContext(SessionContext);
  const { screenOptionsDrawer } = useScreenOptionsDrawer({ menuItems });
  const [configurations, setConfigurations] = useState<Module[]>([]);
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (loginData) {
      setConfigurations(
        loginData.modules.filter(
          (ele) =>
            !!ele.setting_module_config &&
            ele.setting_module_config.position ===
              PositionsModules.ConfiguracionSubMenu &&
            ele.is_render_mobile === 1 &&
            // Condicional para limitar las configuraciones obtenidas a fines prácticos de los requerimientos
            ele.module === "DEVICE"
        )
      );
    }
  }, [loginData]);
  return (
    <>
      <Drawer.Screen
        options={{ ...screenOptionsDrawer, title: "Configurations" }}
      />

      <View
        style={{
          ...styles.configGeneralPage,
          backgroundColor:
            colorScheme === "light"
              ? lightTheme.colors.background
              : darkTheme.colors.background,
        }}
      >
        <List.Section style={styles.listConfigurationContainer}>
          <List.Subheader>
            <Text>Configurations</Text>
          </List.Subheader>
          {configurations.length ? (
            <>
              {configurations.map((ele) => (
                <>
                  <List.Item
                    key={ele.setting_module_config.key}
                    title={() => (
                      <Link
                        style={{
                          ...styles.linkGoToConfiguration,
                          color:
                            colorScheme === "light"
                              ? lightTheme.colors.tertiary
                              : darkTheme.colors.tertiary,
                        }}
                        href={`(drawer)/${moduleMapper[ele.module].name}`}
                      >
                        {" "}
                        Go to {moduleMapper[ele.module].title} configuration
                      </Link>
                    )}
                    left={() => (
                      <List.Icon icon={moduleMapper[ele.module].icon} />
                    )}
                  />
                  <Divider
                    bold={true}
                    key={`divider_${ele.setting_module_config.key}`}
                  />
                </>
              ))}
            </>
          ) : null}
        </List.Section>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  configGeneralPage: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: 24,
  },
  listConfigurationContainer: {
    padding: 32,
    width: "100%",
  },
  linkGoToConfiguration: {
    textDecorationLine: "underline",
  },
});
export default Page;
