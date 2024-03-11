import { Dispatch, SetStateAction, createContext } from "react";
import { LoginResponse, Module, User } from "../interfaces/login";

export const SessionContext = createContext<{
  loginData: LoginResponse | undefined;
  setLoginData: Dispatch<SetStateAction<LoginResponse | undefined>>;
  menuItems: Module[];
  setMenuItems: Dispatch<SetStateAction<Module[]>>;
}>({
  loginData: {
    id_client: 0,
    id_instance: 0,
    modules: [],
    token: "",
    uid_client: "",
    user: {
      all_permission: 0,
      create_visit: 0,
      email: "",
      first_name: "",
      id_user: 0,
      ip: "",
      last_name: "",
      login_failed: 0,
      notifications: {},
      phone: "",
      registration_stations: [],
      roles: [],
      settings_user: {
        favorite_persons: [],
        favorite_work_orders: [],
        format_date: "",
        format_length: 0,
        format_numeric: "",
        format_temperature: "",
        format_time: "",
        headers: [],
        id_event_hour: 0,
        id_format_name: 0,
        languaje: "",
        status_approval: 0,
        timezone_pg: "",
        widgets: [],
      },
      status: 0,
      structures: [],
    },
    version: {
      api: "",
      oauth: "",
    },
  },
  setLoginData: () => {},
  menuItems: [],
  setMenuItems: () => {},
});
