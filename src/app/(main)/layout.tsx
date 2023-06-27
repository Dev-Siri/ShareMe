export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <aside></aside>
      <main>{children}</main>
    </>
  );
}
