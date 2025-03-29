import Navbar from "@/components/navbar";
import { MobileMenu } from "@/components/navbar/MoblieMenu";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function WtihTopBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <MobileMenu />
      <main className="w-full min-h-screen">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
