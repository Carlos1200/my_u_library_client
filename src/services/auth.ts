import api from "../api";
import { LoginResponse } from "../interfaces/index";

export const authenticate = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => api.post<LoginResponse>("/auth", { email, password });

export const getAuth = () => api.get("/auth");
