import { useContext, useEffect, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import { LoginInput, LoginResponse } from "../../interfaces/login";
import { login as loginRequest } from "../../api/services/login";
import * as yup from "yup";
import { Formik } from "formik";
import * as SecureStore from "expo-secure-store";

import { router } from "expo-router";
import { SessionContext } from "../../contexts/SesionContext";
import useScreenOptionsDrawer from "../../shared/hooks/useScreenOptionsDrawer";

const login = () => {
  const { setLoginData } = useContext(SessionContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<string>();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const { contentStyleTheming } = useScreenOptionsDrawer({ menuItems: [] });
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("You must enter your email address")
      .email("The e-mail is invalid"),
    password: yup.string().required("You must enter your password"),
  });

  const onClickLogin = async (formData: LoginInput) => {
    setLoginLoading(true);
    try {
      const response: LoginResponse = await loginRequest({ ...formData });
      await SecureStore.setItemAsync("token", response.token);
      setLoginData(response);
      router.push("/");
    } catch (error: any) {
      setErrorLogin(error.message);
    }
    setLoginLoading(false);
  };
  return (
    <View
      style={{
        ...styles.loginPage,
        backgroundColor: contentStyleTheming.backgroundColor,
      }}
    >
      <Text style={styles.loginPageTitle} variant="headlineLarge">
        Expo App
      </Text>
      <View style={styles.loginPageContainerInputs}>
        <Formik
          validationSchema={schema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => onClickLogin(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <TextInput
                mode="outlined"
                style={styles.loginPageInputs}
                label="E-mail"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <HelperText type="error" visible={!!errors.email}>
                {errors.email}
              </HelperText>
              <TextInput
                mode="outlined"
                style={styles.loginPageInputs}
                label="Password"
                secureTextEntry={!showPassword}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                }
              />
              <HelperText type="error" visible={!!errors.password}>
                {errors.password}
              </HelperText>
              {loginLoading ? (
                <>
                  <ActivityIndicator size={"small"} />
                </>
              ) : (
                <>
                  <Button
                    style={styles.loginPageButton}
                    mode="contained"
                    onPress={
                      handleSubmit as unknown as (
                        e: GestureResponderEvent
                      ) => void
                    }
                  >
                    Login
                  </Button>
                </>
              )}
            </>
          )}
        </Formik>
      </View>

      <HelperText type="error" visible={!!errorLogin}>
        {errorLogin}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingLeft: 62,
    paddingRight: 62,
  },
  loginPageInputs: {
    width: "100%",
  },
  loginPageContainerInputs: {
    gap: 8,
    flexDirection: "column",
    width: "100%",
  },
  loginPageTitle: {
    marginBottom: 32,
  },
  loginPageButton: {
    marginTop: 32,
    width: "100%",
  },
});
export default login;
