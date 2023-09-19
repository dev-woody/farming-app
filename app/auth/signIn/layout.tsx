import getQueryClient from "@/pages/api/hooks/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";

export interface User {
  uuid: number;
  user_id: string;
  name: string;
}

async function getUsers() {
  const response = await fetch("http://localhost:3000/api/users/findAll");
  const users = (await response.json()) as User[];
  return users;
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["user"], getUsers);
  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
}
