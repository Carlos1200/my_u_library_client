import {
  Home,
  Login,
  BookDetail,
  BookForm,
  UserForm,
  ChangePassword,
  BorrowBook,
} from "../pages";
import { AuthorForm } from "../pages/AuthorForm";
import { GenreForm } from "../pages/GenreForm";

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
    to: "/books/new",
    path: "/books/new",
    Component: BookForm,
    name: "New Book",
  },
  {
    to: "/books/borrowed",
    path: "/books/borrowed",
    Component: BorrowBook,
    name: "Borrowed Books",
  },
  {
    to: "/books/:id",
    path: "/books/:id",
    Component: BookDetail,
    name: "Books",
  },
  {
    to: "/authors/new",
    path: "/authors/new",
    Component: AuthorForm,
    name: "New Author",
  },
  {
    to: "/genre/new",
    path: "/genre/new",
    Component: GenreForm,
    name: "New Genre",
  },
  {
    to: "/user/new",
    path: "/user/new",
    Component: UserForm,
    name: "New User",
  },
  {
    to: "/user/password",
    path: "/user/password",
    Component: ChangePassword,
    name: "Change Password",
  },
];
