import { Stack } from "expo-router";
import useScreenOptionsDrawer from "../../../../shared/hooks/useScreenOptionsDrawer";

const PlansLayout = () => {
  const { contentStyleTheming } = useScreenOptionsDrawer({ menuItems: [] });
  return (
    <Stack screenOptions={{ contentStyle: { ...contentStyleTheming } }}></Stack>
  );
};

export default PlansLayout;
