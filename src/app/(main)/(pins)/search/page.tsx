import type { Pin as PinType } from "@/types";

import client from "@/db/lib/client";
import { feedQuery, searchQuery } from "@/utils/data";

import Pin from "@/components/Pin";

interface Props {
  searchParams: {
    query: string;
  };
}

export default async function Search({ searchParams: { query = "" } }: Props) {
  let pins: PinType[];

  if (query) {
    pins = await client.fetch<PinType[]>(searchQuery(query.toLowerCase()));
  } else {
    pins = await client.fetch<PinType[]>(feedQuery);
  }

  return (
    <>
      {pins?.length !== 0 && (
        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pins && pins?.map((pin) => <Pin pin={pin} key={pin._id} />)}
        </article>
      )}
      {pins?.length === 0 && query !== "" && (
        <article className="mt-10 text-center text-xl">No Pins Found!</article>
      )}
    </>
  );
}
