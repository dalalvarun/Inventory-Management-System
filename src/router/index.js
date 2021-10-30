import { createRouter, createWebHistory } from "vue-router";
// import jwt from "jsonwebtoken";
import store from "../store";
import axios from "axios";

const guard = async (to, from, next) => {
  if (store.state.token === null) next("/auth");
  else {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + store.state.token;
    let result = await axios.post(process.env.VUE_APP_API + "/checkToken");
    if (result.data.message === "Authenticated") next();
    else next("/auth");
  }
};
const guard2 = async (to, from, next) => {
  if (store.state.token === null) next();
  else {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + store.state.token;
    let result = await axios.post(process.env.VUE_APP_API + "/checkToken");
    if (result.data === "Authenticated") next("/");
    else next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Dashboard.vue"),
    beforeEnter: guard,
  },
  {
    path: "/inventory/add",
    name: "Add Inventory",
    component: () => import("../components/AddInventory.vue"),
    beforeEnter: guard,
  },
  {
    path: "/inventory/view",
    name: "View Inventory",
    component: () => import("../components/ViewInventory.vue"),
    beforeEnter: guard,
  },
  {
    path: "/auth",
    name: "Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    beforeEnter: guard2,
    component: () => import("../components/Signup.vue"),
  },
  {
    path: "/defective/add",
    name: "Add Defective",
    beforeEnter: guard,
    component: () => import("../components/AddDefective.vue"),
  },
  {
    path: "/transaction/add",
    name: "Assign Inventory",
    beforeEnter: guard,
    component: () => import("../components/AssignInventory.vue"),
  },
  {
    path: "/transaction/return",
    name: "Return Inventory",
    beforeEnter: guard,
    component: () => import("../components/ReturnInventory.vue"),
  },
  {
    path: "/transaction/all",
    name: "View Transactions",
    beforeEnter: guard,
    component: () => import("../components/ViewTransactions.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  store,
});

// router.beforeEach((to, from, next) => {
//   if (store.state.token === null) next("/auth");
//   else {
//     axios.defaults.headers.common["Authorization"] =
//       "Bearer " + store.state.token;
//     let result = axios.post(process.env.VUE_APP_API + "/checkToken");
//     console.log(result);
//     next();
//   }
//   // component: () => import("pages/Auth.vue")
// });

export default router;
