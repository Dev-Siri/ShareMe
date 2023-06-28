import type { PropsWithChildren } from "react";

import Navbar from "@/components/Navbar";

export default function PinsLayout({ children }: PropsWithChildren) {
  return (
    <div className="px-2 md:px-5">
      <section className="bg-gray-50">
        <Navbar />
      </section>
      <section className="h-full">{children}</section>
    </div>
  );
}
