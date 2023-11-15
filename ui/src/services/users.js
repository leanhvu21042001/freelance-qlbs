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

export const getUsers = async () => {
  const res = await request.get("/users");
  return res;
};

export const getSingleUser = async (userId) => {
  const res = await request.get(`/users/${userId}`);
  return res;
};

export const editUser = async ({ userId, username }) => {
  const res = await request.put(`/users/${userId}`, {
    username,
  });
  return res;
};

export const createUser = async ({ username }) => {
  const res = await request.post("/users", {
    username,
  });
  return res;
};

export const deleteUser = async (userId) => {
  const res = await request.delete(`/users/${userId}`);
  return res;
};
