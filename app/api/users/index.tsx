import { accessAxios, customAxios } from "../createAPI";

export interface User {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function getUsers() {
  return accessAxios.get(`/api/users`).then((res) => res.data);
}

export async function signIn(payload: { user_id: string; password: string }) {
  return customAxios.post(`/api/signIn`, payload).then((res) => res.data);
}
