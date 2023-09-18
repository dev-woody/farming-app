export interface User {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function getUsers() {
  const response = await fetch("https://localhost:8080/users/findAll");
  const users = (await response.json()) as User[];
  return users;
}
