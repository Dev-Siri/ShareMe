import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";
import Link from "next/link";
import { redirect } from "next/navigation";

import type { PropsWithChildren } from "react";

import Sidebar from "@/components/Sidebar";
import useSession from "@/hooks/useSession";
import { categories } from "@/utils/data";
import Image from "next/image";

export default function MainLayout({ children }: PropsWithChildren) {
  const user = useSession();

  if (!user) redirect("/login");

  return (
    <article className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <Sidebar
        user={user}
        closeIcon={
          <AiFillCloseCircle fontSize={30} className="cursor-pointer" />
        }
      >
        <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Categories</h3>
        {categories.slice(0, categories.length - 1).map((category) => (
          <Link
            href={`/category/${category.name}`}
            className="flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration:200 ease-in-out capitalize"
            key={category.name}
          >
            <Image
              src={category.image}
              height={32}
              width={32}
              className="w-8 h-8 rounded-full shadow-sm"
              alt="category"
            />
            {category.name}
          </Link>
        ))}
      </Sidebar>
      <main className="pb-2 flex-1 h-screen overflow-y-scroll">{children}</main>
    </article>
  );
}
