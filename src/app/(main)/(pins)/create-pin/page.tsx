import { AiOutlineCloudUpload } from "@react-icons/all-files/ai/AiOutlineCloudUpload";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { redirect } from "next/navigation";

import client from "@/db/lib/client";
import useSession from "@/hooks/useSession";
import { categories } from "@/utils/data";
import Image from "next/image";

import PreviewImage from "./preview-image";

async function savePin(formData: FormData) {
  "use server";
  const title = formData.get("title");
  const about = formData.get("about");
  const destination = formData.get("destination");
  const image = formData.get("image");
  const category = formData.get("category");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useSession();

  if (
    !title ||
    !about ||
    !destination ||
    !image ||
    !category ||
    !user ||
    title instanceof Blob ||
    about instanceof Blob ||
    destination instanceof Blob ||
    typeof image === "string" ||
    categories instanceof Blob
  )
    return;

  const imageAsset = await client.assets.upload("image", image, {
    contentType: image.type,
    filename: crypto.randomUUID(),
  });

  const doc = {
    _type: "pin",
    title,
    about,
    destination,
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: imageAsset?._id,
      },
    },
    userId: user.sub,
    postedBy: {
      _type: "postedBy",
      _ref: user.sub,
    },
    category,
  };

  await client.create(doc);
  redirect("/");
}

export default function CreateAPin() {
  const user = useSession();

  return (
    <form
      action={savePin}
      className="flex flex-col justify-center items-center mt-5 lg:h-4/5"
    >
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <PreviewImage
            uploadIcon={<AiOutlineCloudUpload />}
            deleteIcon={<MdDelete />}
          />
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            name="title"
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-p-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <Image
                src={user.picture}
                alt="user-profile"
                height={40}
                width={40}
                className="w-10 h-10 rounded-full"
              />
              <p className="font-bold">{user.name}</p>
            </div>
          )}
          <input
            type="text"
            name="about"
            placeholder="What is your pin about?"
            className="outline-none text-base sm:text-lg border-p-2 border-gray-200 p-2"
          />
          <input
            type="text"
            name="destination"
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-p-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                name="category"
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Select category
                </option>
                {categories.map((category) => (
                  <option
                    key={category.name}
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="submit"
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
