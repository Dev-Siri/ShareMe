import { redirect } from "next/navigation";

import type { PropsWithChildren } from "react";

import useSession from "@/hooks/useSession";

import Sidebar from "./sidebar";

export default function MainLayout({ children }: PropsWithChildren) {
  const user = useSession();

  if (!user) redirect("/login");

  return (
    <body className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <Sidebar />
      <main className="pb-2 px-2 md:px-5 flex-1 h-screen overflow-y-scroll">
        {children}
      </main>
    </body>
  );
}
