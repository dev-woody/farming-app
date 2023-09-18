export interface User {
  uuid: number;
  user_id: string;
  name: string;
}

export async function getUsers() {
  const response = await fetch("http://localhost:3000/api/users/findAll");
  const users = (await response.json()) as User[];
  return users;
}
