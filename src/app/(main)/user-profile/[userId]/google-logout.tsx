"use client";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  logout(): Promise<void>;
}

export default function GoogleLogout({ children, logout }: Props) {
  async function handleLogout() {
    const { googleLogout } = await import("@react-oauth/google");

    googleLogout();
    logout();
  }

  return (
    <button
      type="button"
      className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
      onClick={handleLogout}
    >
      {children}
    </button>
  );
}
