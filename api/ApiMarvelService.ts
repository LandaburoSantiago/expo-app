import axios, { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import { getEndpoints } from "../interfaces/endpointsMarvel";

const baseUrl = Constants.expoConfig?.extra?.apiMarvelBaseUrl;
const ts = Constants.expoConfig?.extra?.tsMarvel;
const hash = Constants.expoConfig?.extra?.hashMd5ToMarvel;
const apikey = Constants.expoConfig?.extra?.marvelPublicKey;

export const get = async ({
  endpoint,
  config,
}: {
  endpoint: getEndpoints;
  config: AxiosRequestConfig;
}) => {
  if (!baseUrl || !ts || !hash || !apikey) {
    console.error("Faltan definir variables de entorno para la api de marvel");
    return;
  }
  const response = axios.get(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ts,
      apikey,
      hash,
      ...config.params,
    },
  });
  return (await response).data;
};
