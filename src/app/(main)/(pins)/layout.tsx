import type { PropsWithChildren } from "react";

import Navbar from "./navbar";

export default function PinsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <section className="h-full">{children}</section>
    </>
  );
}
