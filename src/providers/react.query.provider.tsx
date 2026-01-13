"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 min
        gcTime: 10 * 60 * 1000, // 10 minutes - cache for 10 min (formerly cacheTime)
        retry: 1, // Only retry once on failure
        retryDelay: 1000, // Wait 1s before retry
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;





