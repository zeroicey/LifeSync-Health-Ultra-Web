import Navbar from "@/components/navbar";
import { MobileMenu } from "@/components/navbar/MoblieMenu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function WtihTopBarLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
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
