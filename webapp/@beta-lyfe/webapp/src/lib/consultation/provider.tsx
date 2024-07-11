import { HuddleClient, HuddleProvider } from "@huddle01/react";
import { config } from "../config";
import { FunctionComponent } from "react";
import { ReactNode } from "@tanstack/react-router";

export const ConsultationProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const client = new HuddleClient({
    projectId: config.huddle01.projectId,
    options: {
      activeSpeakers: {
        size: 8,
      },
    },
  });

  return (
    <HuddleProvider client={client}>
      {children}
    </HuddleProvider>
  );
}
