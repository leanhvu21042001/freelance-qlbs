import request from "./request";

export const getSingleBook = async (bookId) => {
  const res = await request.get(`/books/${bookId}`);
  console.log(res);
  return res;
};

export const getBooks = async () => {
  const res = await request.get("/books");
  return res;
};

export const editBook = async ({ bookId, title, author_id }) => {
  const res = await request.put(`/books/${bookId}`, {
    title,
    author_id,
  });

  return res;
};

export const createBook = async ({ title, author_id }) => {
  const res = await request.post("/books", {
    title,
    author_id,
  });

  return res;
};

export const deleteBook = async (bookId) => {
  const res = await request.delete(`/books/${bookId}`);

  return res;
};
