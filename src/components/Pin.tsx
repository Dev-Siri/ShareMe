import Link from "next/link";

import type { Pin } from "@/types";

import { AiTwotoneDelete } from "@react-icons/all-files/ai/AiTwotoneDelete";
import { MdFileDownload } from "@react-icons/all-files/md/MdFileDownload";

import client from "@/db/lib/client";
import urlFor from "@/db/lib/image";
import useSession from "@/hooks/useSession";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import SaveButton from "./SaveButton";

interface Props {
  pin: Pin;
}

async function savePin(id: string, alreadySaved: boolean) {
  "use server";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useSession();

  if (alreadySaved) return;

  await client
    .patch(id)
    .setIfMissing({ save: [] })
    .insert("after", "save[-1]", [
      {
        _key: crypto.randomUUID(),
        userId: user?.sub,
        postedBy: {
          _type: "postedBy",
          _ref: user?.sub,
        },
      },
    ])
    .commit();

  revalidatePath("/");
}

async function deletePin(id: string) {
  "use server";
  await client.delete(id);

  revalidatePath("/");
}

export default async function Pin({
  pin: { postedBy, image, _id, save },
}: Props) {
  const user = useSession();

  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  )?.length;

  return (
    <article className="m-2">
      <div className="relative group cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
        <Link href={`/pin-detail/${_id}`}>
          <Image
            className="rounded-lg w-full"
            alt="user-post"
            src={urlFor(image).width(250).url()}
            height={2000}
            width={250}
          />
        </Link>
        <div className="absolute inset-0 w-[310px] md:w-[250px] group-hover:visible invisible h-full flex flex-col justify-between p-1 pr-2 pt-1 pb-2 z-50">
          <section className="flex items-center justify-between">
            <div className="flex gap-2">
              <a
                href={`${image?.asset?.url}?dl=`}
                download
                className="bg-white z-50 w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdFileDownload />
              </a>
            </div>
            {alreadySaved ? (
              <button
                type="button"
                className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
              >
                {save?.length} Saved
              </button>
            ) : (
              <SaveButton
                savePin={savePin}
                alreadySaved={alreadySaved}
                id={_id}
              />
            )}
          </section>
          <section className="flex justify-between items-center gap-2 w-full">
            {postedBy?._id === user?.sub && (
              <DeleteButton id={_id} deletePin={deletePin}>
                <AiTwotoneDelete />
              </DeleteButton>
            )}
          </section>
        </div>
      </div>
      <Link
        href={`user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <Image
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          height={32}
          width={32}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </article>
  );
}
