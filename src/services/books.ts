import api from "../api";
import { BookIdResponse, BookResponse } from "../interfaces";

export const getBooks = async () => api.get<BookResponse>("/books");

export const getBook = async (id: string) =>
  api.get<BookIdResponse>(`/books/${id}`);
