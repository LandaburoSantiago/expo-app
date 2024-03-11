import { AxiosError } from "axios";
import { LoginInput } from "../../interfaces/login";
import { serverErrorResponse } from "../../shared/serverErrorResponse";
import { post } from "../ApiService";

const login = async (loginInput: LoginInput) => {
  try {
    const response = await post({
      endpoint: "login",
      auth: false,
      config: {
        data: loginInput,
      },
    });

    return response;
  } catch (error: any) {
    throw new Error(serverErrorResponse.login[error.response.status as number]);
  }
};

export { login };
