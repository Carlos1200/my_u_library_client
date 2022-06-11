import api from "../api";
import { BookIdResponse, BookResponse, BorrowedResponse } from "../interfaces";

interface BookProp {
  title: string;
  published_year: number;
  stock: number;
  authorId: string[];
  genreId: string[];
}

export const getBooks = async () => api.get<BookResponse>("/books");

export const getBook = async (id: string) =>
  api.get<BookIdResponse>(`/books/${id}`);

export const filterBooks = async (
  title: string | null,
  author: string | null,
  genre: string | null
) => {
  const query = new URLSearchParams();
  if (title) query.append("title", title);
  if (author) query.append("author", author);
  if (genre) query.append("genre", genre);

  return api.get<BookResponse>(`/books/filter?${query.toString()}`);
};

export const createBook = async (book: BookProp) =>
  api.post<BookIdResponse>("/books", book);

export const borrowBook = async (id: string) =>
  api.put<BookIdResponse>(`/books/borrow/${id}`);

export const getBorrowBooks = async () =>
  api.get<BorrowedResponse>("/books/borrow");

export const returnBook = async (id: string, userId: string) =>
  api.put<BookIdResponse>(`/books/borrow/return/${id}`, { userId });
