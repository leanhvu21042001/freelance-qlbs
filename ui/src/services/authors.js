import request from "./request";

export const getAuthors = async () => {
  const res = await request.get("/authors");

  return res;
};
