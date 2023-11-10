import { accessAxios, customAxios } from "../createAPI";

export interface User {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function getUsers() {
  return accessAxios.get(`/api/nest/users`).then((res) => res.data);
}

export async function signIn(user_id: string, password: string) {
  return customAxios
    .post(`/api/nest/signIn`, { user_id, password })
    .then((res) => res.data);
}
