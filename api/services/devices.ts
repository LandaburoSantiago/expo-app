import { serverErrorResponse } from "../../shared/serverErrorResponse";
import { get } from "../ApiService";
import { GetDevicesInput, GetDevicesResponse } from "../../interfaces/devices";

const devices = async (getDevicesInput: GetDevicesInput) => {
  try {
    const response: GetDevicesResponse = await get({
      endpoint: "devices",
      auth: true,
      config: {
        params: getDevicesInput,
      },
    });

    return response;
  } catch (error: any) {
    throw new Error(serverErrorResponse.login[error.response.status as number]);
  }
};

export { devices };
