import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { PopupProvider } from "./PopupProvider";
import { PortalProvider } from "./PortalProvider";
import { SnackbarProvider } from "./SnackbarProvider";
import { TooltipProvider } from "./TooltipProvider";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

export function FeComponentsProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <PortalProvider>
        <TooltipProvider>
          <SnackbarProvider>
            <PopupProvider>{children}</PopupProvider>
          </SnackbarProvider>
        </TooltipProvider>
      </PortalProvider>
    </QueryClientProvider>
  );
}
