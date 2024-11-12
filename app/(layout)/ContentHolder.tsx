"use client";
import LocationContainer from "@/components/PropertyLocation/LocationContainer";
import React, { useEffect } from "react";
import { Toaster, toast } from "sonner";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
// import { persistQueryClient } from "@tanstack/react-query-persist-client";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient();

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const localStoragePersister = createSyncStoragePersister({
  //       storage: window.localStorage,
  //     });

  //     persistQueryClient({
  //       queryClient,
  //       persister: localStoragePersister,
  //     });
  //   }
  // }, [queryClient]);

  

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <LocationContainer></LocationContainer>
        {children}
      </QueryClientProvider>
    </div>
  );
}
