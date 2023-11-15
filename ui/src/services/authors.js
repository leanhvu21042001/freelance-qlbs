import request from "./request";

export const getAuthors = async () => {
  const res = await request.get("/authors");

  return res;
};

export const getSingleAuthor = async (authorId) => {
  const res = await request.get(`/authors/${authorId}`);
  return res;
};

export const editAuthor = async ({ authorId, name }) => {
  const res = await request.put(`/authors/${authorId}`, {
    name,
  });

  return res;
};

export const createAuthor = async ({ name }) => {
  const res = await request.post("/authors", {
    name,
  });
  return res;
};

export const deleteAuthor = async (authorId) => {
  const res = await request.delete(`/authors/${authorId}`);
  return res;
};
