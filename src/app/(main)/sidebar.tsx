import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";
import { HiMenu } from "@react-icons/all-files/hi/HiMenu";
import { RiHomeFill } from "@react-icons/all-files/ri/RiHomeFill";
import Image from "next/image";
import Link from "next/link";

import useSession from "@/hooks/useSession";
import { categories } from "@/utils/data";

async function SidebarUI() {
  const user = useSession();

  return (
    <aside className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <label htmlFor="sidebar-toggle">
          <Link
            href="/"
            className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          >
            <Image
              src="/logo.avif"
              alt="logo"
              height={63}
              width={304}
              className="w-full"
            />
          </Link>
        </label>
        <label htmlFor="sidebar-toggle">
          <Link
            href="/"
            className="flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration:200 ease-in-out capitalize"
          >
            <RiHomeFill />
            Home
          </Link>
        </label>
        <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Categories</h3>
        {categories.slice(0, categories.length - 1).map((category) => (
          <Link
            href={`/category/${category.name}`}
            className="flex items-center px-5 gap-3 my-1 text-gray-500 hover:text-black transition-all duration:200 ease-in-out capitalize"
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
      </div>
      {user && (
        <label htmlFor="sidebar-toggle">
          <Link
            href={`/user-profile/${user.sub}`}
            className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          >
            <Image
              src={user.picture}
              className="w-10 h-10 rounded-full"
              alt="user-profile"
              height={40}
              width={40}
            />
            <p>{user.name}</p>
          </Link>
        </label>
      )}
    </aside>
  );
}

export default async function Sidebar() {
  const user = useSession();

  return (
    <>
      <section className="hidden md:flex h-screen flex-initial">
        <SidebarUI />
      </section>
      <header className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <label htmlFor="sidebar-toggle" className="text-4xl">
            <HiMenu fontSize={40} className="cursor-pointer" />
          </label>
          <Link href="/">
            <Image
              src="/logo.avif"
              height={63}
              width={112}
              alt="logo"
              className="w-28"
            />
          </Link>
          <Link href={`user-profile/${user?.sub}`}>
            <Image
              src={user?.picture!}
              alt="logo"
              height={112}
              width={112}
              className="w-28"
            />
          </Link>
        </div>
        <input type="checkbox" id="sidebar-toggle" className="hidden" />
        <div
          id="sidebar"
          className="w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10"
        >
          <label
            htmlFor="sidebar-toggle"
            className="absolute w-full flex justify-end items-center p-2"
          >
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" />
          </label>
          <SidebarUI />
        </div>
      </header>
    </>
  );
}
