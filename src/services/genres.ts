import api from "../api";
import { GenreResponse } from "../interfaces";

export const getGenres = async () =>
  api.get<GenreResponse[]>("/genres").then((res) => res.data);

export const postGenre = async (name: string) =>
  api.post<GenreResponse>("/genres", { name });
