import api from "../api";
import { AuthorResponse } from "../interfaces";

export const getAuthors = async () => api.get<AuthorResponse[]>("/authors");

export const postAuthor = async (name: string) =>
  api.post<AuthorResponse>("/authors", { name });
