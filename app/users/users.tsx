"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./getUsers";

export default function Users() {
  // This useQuery could just as well happen in some deeper child to
  // the "HydratedPosts"-component, data will be available immediately either way
  const { data } = useQuery({ queryKey: ["users"], queryFn: getUsers });

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix

  return (
    <div className="flex">
      <div>
        <h2 className="text-lg text-center font-bold mb-6">
          React Query SSR 적용
        </h2>
        <ul>
          {data?.map((user) => (
            <li key={user.uuid}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
