import { getUsers } from "@/app/api/users";
import getQueryClient from "@/pages/hooks/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";

export interface User {
  uuid: number;
  user_id: string;
  name: string;
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
