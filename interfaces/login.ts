export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  modules: Module[];
  id_client: number;
  uid_client: string;
  id_instance: number;
  version: Version;
}

export interface Module {
  id_module: number;
  module: string;
  path: string;
  setting_module_config: SettingModuleConfigClass;
  order: number | null;
  is_render: number;
  is_render_mobile: number;
  operations?: number[];
}

export interface SettingModuleConfigClass {
  key: string;
  icon: string;
  route: string;
  position: string;
}

export interface User {
  id_user: number;
  email: string;
  first_name: string;
  last_name: string | null;
  structures: number[];
  roles: number[];
  registration_stations: any[];
  settings_user: SettingsUser;
  notifications: Notifications;
  phone: string;
  status: number;
  all_permission: number;
  create_visit: number;
  login_failed: number;
  ip: string;
}

export interface Notifications {}

export interface SettingsUser {
  headers: any[];
  widgets: Widget[];
  languaje: string;
  format_date: string;
  format_time: string;
  timezone_pg: string;
  format_length: number;
  id_event_hour: number;
  format_numeric: string;
  id_format_name: number;
  status_approval: number;
  favorite_persons: any[];
  format_temperature: string;
  favorite_work_orders: any[];
}

export interface Widget {
  h: number;
  w: number;
  x: number;
  y: number;
  id_widget: number;
  id_widget_user: string;
}

export interface Version {
  api: string;
  oauth: string;
}
