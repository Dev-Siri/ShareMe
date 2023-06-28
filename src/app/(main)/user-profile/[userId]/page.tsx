import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import type { Pin as PinType, SanityUser } from "@/types";

import client from "@/db/lib/client";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "@/utils/data";

import Pin from "@/components/Pin";
import GoogleLogout from "./google-logout";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photograpy,technology";
const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

interface Props {
  params: {
    userId: string;
  };
  searchParams: {
    type: "created" | "saved";
  };
}

async function logout() {
  "use server";

  cookies().delete("auth_token");
}

export default async function UserProfile({
  params: { userId },
  searchParams: { type = "created" },
}: Props) {
  const user = await client.fetch<SanityUser>(userQuery(userId));

  const pins = await client.fetch<PinType[]>(
    type === "created"
      ? userCreatedPinsQuery(userId)
      : userSavedPinsQuery(userId)
  );

  return (
    <article className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={randomImage}
              height={510}
              width={2000}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <Image
              className="rounded-full w-20 h-20 -mt-10 shadow-xl"
              src={user.image}
              alt="user-pic"
              height={80}
              width={80}
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <GoogleLogout logout={logout}>
                  <AiOutlineLogout color="red" fontSize={21} />
                </GoogleLogout>
              )}
            </div>
          </div>

          <div className="text-center mb-7">
            <Link
              href={`/user-profile/${userId}?type=created`}
              className={`${
                type === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </Link>
            <Link
              href={`/user-profile/${userId}?type=saved`}
              className={`${
                type === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </Link>
          </div>
          {pins?.length ? (
            <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pins && pins?.map((pin) => <Pin pin={pin} key={pin._id} />)}
            </article>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
