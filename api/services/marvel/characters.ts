import {
  CharactersResponse,
  GetCharactersInput,
} from "../../../interfaces/character";
import { get } from "../../ApiMarvelService";

const characters = async (getCharactersInput: GetCharactersInput) => {
  try {
    const response: CharactersResponse = await get({
      endpoint: "characters",
      config: {
        params: getCharactersInput,
      },
    });

    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { characters };
