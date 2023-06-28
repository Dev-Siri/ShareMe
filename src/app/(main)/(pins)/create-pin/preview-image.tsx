"use client";
import Image from "next/image";
import { useState, type ChangeEvent, type ReactNode } from "react";

interface Props {
  uploadIcon: ReactNode;
  deleteIcon: ReactNode;
}

export default function PreviewImage({ uploadIcon, deleteIcon }: Props) {
  const [wrongImageType, setWrongImageType] = useState(false);
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  function validateImage(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const { type } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setPreviewImage(e.target.files[0]);
      return setWrongImageType(false);
    }

    setWrongImageType(true);
  }

  return (
    <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
      {wrongImageType && <p>Wrong image type</p>}
      {!previewImage ? (
        <label htmlFor="image-upload">
          <div className="flex flex-col items-center justify-center height-full">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-2xl">{uploadIcon}</p>
              <p className="text-lg">Click to upload</p>
            </div>
            <p className="mt-32 text-gray-400">
              use high-quality JPG, SVG, PNG, GIF less then 20 MB
            </p>
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            id="image-upload"
            onChange={validateImage}
            className="w-0 h-0"
          />
        </label>
      ) : (
        <div className="relative h-full">
          <Image
            src={URL.createObjectURL(previewImage)}
            alt="uploaded-pic"
            height={1000}
            width={1000}
            className="h-full w-full"
          />
          <button
            type="button"
            className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
            onClick={() => setPreviewImage(null)}
          >
            {deleteIcon}
          </button>
        </div>
      )}
    </div>
  );
}
