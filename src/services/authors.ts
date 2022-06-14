import api from "../api";
import { AuthorResponse } from "../interfaces";

export const getAuthors = async () =>
  api.get<AuthorResponse[]>("/authors").then((res) => res.data);

export const postAuthor = async (name: string) =>
  api.post<AuthorResponse>("/authors", { name });
