import { atom } from "recoil";
import { Book } from "../interfaces";

export const userState = atom({
  key: "userState",
  default: {
    user: null,
  },
});

export const booksState = atom<Book[]>({
  key: "booksState",
  default: [],
});
