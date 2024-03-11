import { Slot, router } from "expo-router";

import { useContext, useLayoutEffect, useState } from "react";
import { SessionContext } from "../../contexts/SesionContext";
import useScreenOptionsDrawer from "../../shared/hooks/useScreenOptionsDrawer";

const _layout = () => {
  const { loginData } = useContext(SessionContext);
  useLayoutEffect(() => {
    if (loginData) router.push("/(drawer)/home");
  }, [loginData]);
  return <Slot />;
};
export default _layout;
