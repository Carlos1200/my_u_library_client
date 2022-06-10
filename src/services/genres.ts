import api from "../api";
import { GenreResponse } from "../interfaces";

export const getGenres = async () => api.get<GenreResponse[]>("/genres");

export const postGenre = async (name: string) =>
  api.post<GenreResponse>("/genres", { name });
