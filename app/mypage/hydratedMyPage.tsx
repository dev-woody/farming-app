import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "@/pages/hooks/getQueryClient";
import { getUsers } from "@/app/api/users";
import MyPage from "./page";

export default async function HydratedUsers() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["user"], getUsers);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MyPage />
    </Hydrate>
  );
}
