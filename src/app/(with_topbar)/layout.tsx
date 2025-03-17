export default function WtihTopBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        Hello, this is topbar.
        {children}
      </body>
    </html>
  );
}
