import api from "../api";
import { User } from "../interfaces";

export const newUser = async (user: User) => api.post<User>("/users", user);

export const changePassword = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) => api.put<User>("/users/password", { oldPassword, newPassword });
