export interface GetDevicesInput {
  limit?: number;
  offset?: number;
  search?: string;
}

export interface GetDevicesResponse {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  results: Device[];
  count: number;
}

export interface Device {
  id_device: number;
  device_name: string;
  id_device_model: number;
  settings_device: SettingsDevice;
  status: number;
  device_model: string;
  photo: null | string;
  hasGroups: boolean;
  entity_group: null;
}

export interface SettingsDevice {
  online: number;
  serial: string;
  access_type?: number;
  id_timezone?: number;
  exit_btn_pos?: number;
  id_structure: number;
  wifi_settings?: WifiSettings;
  time_open_door?: number;
  id_device_action_type?: number;
  ethernet_settings?: EthernetSettings;
  disabled?: number;
  set_company_code?: number;
  set_timelogsync_id?: number;
  response?: number;
  door?: number;
  flipCard?: number;
  id_father?: number;
  readerEncrypt?: number;
  id_door?: number;
}

export interface EthernetSettings {
  ip: string;
  mask: string;
  gateway: string;
  use_dhcp: string;
}

export interface WifiSettings {
  ip: string;
  mask: string;
  ssid: string;
  gateway: string;
  use_dhcp: string;
  use_wifi: number;
}
