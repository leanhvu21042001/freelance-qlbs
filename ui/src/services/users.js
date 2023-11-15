import { setToken } from "../utils/token.utils";
import request from "./request";

export const getMe = async () => {
  const res = await request.get("/me");
  return res;
};

export const login = async ({ username, password }) => {
  const { token } = await request.post("/login", {
    username,
    password,
  });

  return token;
};
