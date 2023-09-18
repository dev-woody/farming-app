"use client";

import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
  pageProps?: any;
};

function Providers({ children }: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {/* <Hydrate state={pageProps.dehydratedProps}> */}
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      {/* </Hydrate> */}
    </QueryClientProvider>
  );
}

export default Providers;
