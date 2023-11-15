import request from "./request";

export const getCustomers = async () => {
  const res = await request.get("/customers");
  return res;
};

export const getSingleCustomer = async (customerId) => {
  const res = await request.get(`/customers/${customerId}`);
  return res;
};

export const editCustomer = async ({ customerId, name, email, phone }) => {
  const res = await request.put(`/customers/${customerId}`, {
    name,
    email,
    phone,
  });
  return res;
};

export const createCustomer = async ({ name, email, phone }) => {
  const res = await request.post("/customers", {
    name,
    email,
    phone,
  });
  return res;
};

export const deleteCustomer = async (customerId) => {
  const res = await request.delete(`/customers/${customerId}`);
  return res;
};
