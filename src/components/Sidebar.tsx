"use client";
import { RiHomeFill } from "@react-icons/all-files/ri/RiHomeFill";
import Image from "next/image";
import Link from "next/link";

import type { GoogleUser } from "@/types";

import {
  useState,
  type Dispatch,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
} from "react";

interface Props extends PropsWithChildren {
  user: GoogleUser;
  closeIcon: ReactNode;
}

interface SidebarUIProps extends PropsWithChildren {
  setToggleSidebar: Dispatch<SetStateAction<boolean>>;
  user: GoogleUser;
}

function SidebarUI({ children, setToggleSidebar, user }: SidebarUIProps) {
  return (
    <aside className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          href="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={() => setToggleSidebar(false)}
        >
          <Image
            src="/logo.avif"
            alt="logo"
            height={63}
            width={304}
            className="w-full"
          />
        </Link>
        <div>
          <Link
            href="/"
            className="flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration:200 ease-in-out capitalize"
            onClick={() => setToggleSidebar(false)}
          >
            <RiHomeFill />
            Home
          </Link>
        </div>
        {children}
      </div>
      {user && (
        <Link
          href={`/user-profile/${user.sub}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={() => setToggleSidebar(false)}
        >
          <Image
            src={user.picture}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.name}</p>
        </Link>
      )}
    </aside>
  );
}

export default function Sidebar({ children, user, closeIcon }: Props) {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <>
      <section className="hidden md:flex h-screen flex-initial">
        <SidebarUI setToggleSidebar={setToggleSidebar} user={user}>
          {children}
        </SidebarUI>
      </section>
      <section className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <button onClick={() => setToggleSidebar(true)} className="text-4xl">
            {closeIcon}
          </button>
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
            <Image src={user?.picture!} alt="logo" className="w-28" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <button
              onClick={() => setToggleSidebar(false)}
              className="absolute w-full flex justify-end items-center p-2"
            >
              {closeIcon}
            </button>
            <SidebarUI setToggleSidebar={setToggleSidebar} user={user}>
              {children}
            </SidebarUI>
          </div>
        )}
      </section>
    </>
  );
}
