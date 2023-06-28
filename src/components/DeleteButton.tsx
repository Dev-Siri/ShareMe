"use client";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  id: string;
  deletePin(id: string): Promise<void>;
}

export default function DeleteButton({ children, id, deletePin }: Props) {
  return (
    <button
      type="button"
      className="bg-white p-2 opacity-70 hover:opacity-100 font-bold px-5 py-1 text-dark rounded-3xl hover:shadow-md outline-none"
      onClick={(e) => {
        e.stopPropagation();
        deletePin(id);
      }}
    >
      {children}
    </button>
  );
}
