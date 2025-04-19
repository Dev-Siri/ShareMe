"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
    >
      {pending ? "Posting comment..." : "Post"}
    </button>
  );
}
