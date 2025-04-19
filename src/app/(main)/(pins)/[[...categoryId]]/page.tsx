import client from "@/db/lib/client";
import { feedQuery, searchQuery } from "@/utils/data";

import type { Pin as PinType } from "@/types";

import Pin from "@/components/Pin";

interface Props {
  params: {
    categoryId: string[];
  };
}

export default async function Home({ params }: Props) {
  const pins = await client.fetch<PinType[]>(
    params.categoryId && params.categoryId.length > 1
      ? searchQuery(params.categoryId[1])
      : feedQuery
  );

  if (!pins?.length) return <h2>No Pins Available!</h2>;

  return (
    <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pins && pins?.map((pin) => <Pin pin={pin} key={pin._id} />)}
    </article>
  );
}
