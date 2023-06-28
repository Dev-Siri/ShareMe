import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";

import type { GoogleUser } from "@/types";

export default function useSession() {
  const authToken = cookies().get("auth_token")?.value;

  if (!authToken) return null;

  return jwtDecode<GoogleUser>(authToken);
}
