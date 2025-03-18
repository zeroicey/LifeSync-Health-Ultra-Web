import Navbar from "@/components/navbar";

export default function WtihTopBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div>
        Hello, this is topbar.
        {children}
      </div>
    </>
  );
}
