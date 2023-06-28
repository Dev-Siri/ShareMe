"use client";

interface Props {
  id: string;
  alreadySaved: boolean;
  savePin(id: string, alreadySaved: boolean): Promise<void>;
}

export default function SaveButton({ id, savePin, alreadySaved }: Props) {
  return (
    <button
      type="button"
      className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
      onClick={(e) => {
        e.stopPropagation();
        savePin(id, alreadySaved);
      }}
    >
      Save
    </button>
  );
}
