import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "../../pages/api/hooks/getQueryClient";
import { getUsers } from "@/pages/api/users";
import Users from "./users";

export default async function HydratedUsers() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["users"], getUsers);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Users />
    </Hydrate>
  );
}
