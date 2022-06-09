import { Home, Login } from "../pages";

type JSXComponent = () => JSX.Element;

interface Route {
  to: string;
  path: string;
  Component: JSXComponent;
  name: string;
  nested?: Route[];
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
];
