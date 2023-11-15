import request from "./request";

export const getOrders = async () => {
  const res = await request.get("/orders");
  return res;
};

export const getSingleOrder = async (orderId) => {
  const res = await request.get(`/orders/${orderId}`);
  return res;
};

export const editOrder = async ({ orderId, name }) => {
  const res = await request.put(`/orders/${orderId}`, {
    name,
  });

  return res;
};

export const createOrder = async ({ order_title, customer_id, book_ids }) => {
  const res = await request.post("/orders", {
    order_title,
    customer_id,
    book_ids,
  });
  return res;
};

export const deleteOrder = async (orderId) => {
  const res = await request.delete(`/orders/${orderId}`);
  return res;
};
