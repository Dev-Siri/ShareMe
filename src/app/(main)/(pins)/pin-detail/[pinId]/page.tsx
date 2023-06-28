import { MdCloudDownload } from "@react-icons/all-files/md/MdCloudDownload";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import type { Pin as PinType } from "@/types";

import client from "@/db/lib/client";
import urlFor from "@/db/lib/image";
import useSession from "@/hooks/useSession";
import { pinDetailMorePinQuery, pinDetailQuery } from "@/utils/data";

import Pin from "@/components/Pin";
import Spinner from "@/components/Spinner";
import SubmitButton from "./submit-button";

async function addComment(formData: FormData) {
  "use server";
  const comment = formData.get("comment");
  const pinId = formData.get("pinId");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useSession();

  if (
    !comment ||
    !pinId ||
    !user ||
    comment instanceof Blob ||
    pinId instanceof Blob
  )
    return;

  await client
    .patch(pinId)
    .setIfMissing({ comments: [] })
    .insert("after", "comments[-1]", [
      {
        comment,
        _key: crypto.randomUUID(),
        postedBy: {
          _type: "postedBy",
          _ref: user.sub,
        },
      },
    ])
    .commit();

  revalidatePath(`/pin-detail/${pinId}`);
}

interface Props {
  params: {
    pinId: string;
  };
}

export default async function PinDetail({ params: { pinId } }: Props) {
  const pinsWithId = await client.fetch<PinType[]>(pinDetailQuery(pinId));
  const pinDetail = pinsWithId[0];

  const pins = await client.fetch<PinType[]>(pinDetailMorePinQuery(pinDetail));

  return (
    <>
      <section
        className="flex xl-flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <Image
            src={urlFor(pinDetail.image).url()}
            className="rounded-t-3xl rounded-b-lg"
            alt="user-post"
            height={500}
            width={500}
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail?.image?.asset?.url}?dl=`}
                download
                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdCloudDownload />
              </a>
            </div>
            <a href={pinDetail.destination} target="_blank" rel="noreferrer">
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3">{pinDetail.about}</p>
          </div>
          <Link
            href={`user-profile/${pinDetail.postedBy?._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <Image
              src={pinDetail.postedBy?.image}
              alt="user-profile"
              height={32}
              width={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="font-semibold capitalize">
              {pinDetail.postedBy?.userName}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={comment.postedBy._id}
              >
                <Image
                  src={comment.postedBy?.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  height={40}
                  width={40}
                  alt="user-profile"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy?.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <form action={addComment} className="flex flex-wrap mt-6 gap-3">
            <Link href={`user-profile/${pinDetail.postedBy?._id}`}>
              <Image
                src={pinDetail.postedBy?.image}
                alt="user-profile"
                height={40}
                width={40}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Link>
            <input type="hidden" name="pinId" value={pinId} />
            <input
              type="text"
              placeholder="Add a comment"
              name="comment"
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focuse:border-gray-300"
            />
            <SubmitButton />
          </form>
        </div>
      </section>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2x mt-8 mb-4">
            More like this
          </h2>
          <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pins && pins?.map((pin) => <Pin pin={pin} key={pin._id} />)}
          </article>
        </>
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
}
