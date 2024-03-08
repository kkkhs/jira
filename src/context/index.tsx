import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
import { Query } from "@testing-library/react";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  // const queryClient = new QueryClient();

  return (
    // <QueryClientProvider client={queryClient}>
    <AuthProvider>{children}</AuthProvider>
    // </QueryClientProvider>
  );
};
