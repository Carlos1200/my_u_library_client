import api from "../api";
import { BookResponse } from "../interfaces";

export const getBooks = async () => api.get<BookResponse>("/books");
