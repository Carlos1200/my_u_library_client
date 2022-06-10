import { Home, Login, BookDetail } from "../pages";

type JSXComponent = () => JSX.Element;

interface Route {
  to: string;
  path: string;
  Component: JSXComponent;
  name: string;
}

export const routes: Route[] = [
  {
    to: "/login",
    path: "/login",
    Component: Login,
    name: "Login",
  },
  {
    to: "/",
    path: "/",
    Component: Home,
    name: "Home",
  },
  {
    to: "/books/:id",
    path: "/books/:id",
    Component: BookDetail,
    name: "Books",
  },
];
