import { IoMdAdd } from "@react-icons/all-files/io/IoMdAdd";
import { IoMdSearch } from "@react-icons/all-files/io/IoMdSearch";

import useSession from "@/hooks/useSession";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function search(formData: FormData) {
  "use server";
  const query = formData.get("query");

  if (!query || query instanceof Blob) return;

  redirect(`/search?query=${query}`);
}

export default async function Navbar() {
  const user = useSession();

  if (!user) return null;

  return (
    <nav className="flex bg-gray-50 gap-2 md:gap-5 w-full mt-5 pb-7">
      <form
        action={search}
        className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm"
      >
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          name="query"
          type="text"
          placeholder="Search"
          className="p-2 w-full bg-white outline-none"
        />
      </form>
      <section className="flex gap-3">
        <Link href={`/user-profile/${user?.sub}`} className="hidden md:block">
          <Image
            src={user.picture}
            alt="user"
            height={48}
            width={56}
            className="w-14 h-12 rounded-lg"
          />
        </Link>
        <Link
          href="/create-pin"
          className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
      </section>
    </nav>
  );
}
