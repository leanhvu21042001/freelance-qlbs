import { createRouter, createWebHistory } from "vue-router";

import Books from "./Books.vue";
import Authors from "./Authors.vue";
import Customers from "./Customers.vue";
import Users from "./Users.vue";
import Orders from "./Orders.vue";
import NotFound from "./NotFound.vue";
import Login from "./Login.vue";
import { getMe } from "../services/users";

const routes = [
  { path: "/", name: "Books", component: Books },
  { path: "/authors", name: "Authors", component: Authors },
  { path: "/customers", name: "Customers", component: Customers },
  { path: "/users", name: "Users", component: Users },
  { path: "/orders", name: "Orders", component: Orders },
  { path: "/login", name: "Login", component: Login },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let isAuthenticated = false;
  try {
    const res = await getMe();
    isAuthenticated = true;
  } catch (error) {
    isAuthenticated = false;
  }

  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else if (to.name === "Login" && isAuthenticated) next({ name: "Books" });
  else next();
});

export default router;
