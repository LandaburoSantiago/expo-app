export const serverErrorResponse: {
  login: { [key: number]: string };
  app: { [key: number]: string };
} = {
  login: {
    401: "The user or password is incorrect",
  },
  app: {
    401: "You are not authorized to perform this action",
  },
};
