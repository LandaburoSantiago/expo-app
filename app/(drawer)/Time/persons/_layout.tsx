import { Stack } from "expo-router";
import useScreenOptionsDrawer from "../../../../shared/hooks/useScreenOptionsDrawer";

const PersonsLayout = () => {
  const { contentStyleTheming } = useScreenOptionsDrawer({ menuItems: [] });
  return (
    <Stack screenOptions={{ contentStyle: { ...contentStyleTheming } }}></Stack>
  );
};

export default PersonsLayout;
