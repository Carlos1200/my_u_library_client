import { atom } from "recoil";
import { Book, User } from "../interfaces";

export const userState = atom<User>({
  key: "userState",
  default: {} as User,
});

export const booksState = atom<Book[]>({
  key: "booksState",
  default: [],
});
