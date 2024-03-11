import * as SecureStore from "expo-secure-store";
import axios, { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import { getEndpoints, postEndpoints } from "../interfaces/endpoints";

const baseUrl = Constants.expoConfig?.extra?.apiBaseUrl;

export const get = async ({
  endpoint,
  auth,
  config,
}: {
  endpoint: getEndpoints;
  auth: boolean;
  config: AxiosRequestConfig;
}) => {
  if (!baseUrl) {
    console.error("Variable de entorno apiBaseUrl no definida");
    return;
  }
  let token;
  if (auth) {
    token = await SecureStore.getItemAsync("token");
  }

  const response = axios.get(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: auth ? `Bearer ${token}` : undefined,
    },
    ...config,
  });
  return (await response).data;
};

export const post = async ({
  endpoint,
  auth,
  config,
}: {
  endpoint: postEndpoints;
  auth: boolean;
  config: AxiosRequestConfig;
}) => {
  if (!baseUrl) {
    console.error("Variable de entorno apiBaseUrl no definida");
    return;
  }
  let token;
  if (auth) {
    token = await SecureStore.getItemAsync("token");
  }

  const response = await axios.post(
    `${baseUrl}${endpoint}`,
    config.data ? { ...config.data } : undefined,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth ? `Bearer ${token}` : undefined,
      },
      ...config,
    }
  );
  return response.data;
};
