import { AppContent } from "@/components/body/app-content";
import { AppShell } from "@/components/body/app-shell";
import Header from "@/components/nav/Header";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

// eslint-disable-next-line
export default ({ children }: AppLayoutProps) => {
  return (
    <AppShell variant="sidebar">
      <Header />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        {/* <AppSidebarHeader breadcrumbs={breadcrumbs} /> */}
        {children}
      </AppContent>
    </AppShell>
  );
};
