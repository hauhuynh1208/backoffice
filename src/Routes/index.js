import Home from "../Pages/Home";

export const routes = [
  {
    path: "/",
    title: "Home",
    exact: true,
    component: Home,
    requireAuth: true,
  },
];
