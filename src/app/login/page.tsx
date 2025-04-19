import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import GoogleLoginButton from "./google-login";
import GoogleOAuthProvider from "./google-oauth-provider";

import client from "@/db/lib/client";
import { GoogleUser } from "@/types";

async function addUserToDB(credentialsToken: string) {
  "use server";
  const { sub, name, picture } = jwtDecode<GoogleUser>(credentialsToken);

  const doc = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  await client.createIfNotExists(doc);

  cookies().set("auth_token", credentialsToken, {
    expires: new Date(9999, 0, 1),
    sameSite: true,
  });

  redirect("/");
}

export default function Login() {
  return (
    <body>
      <GoogleOAuthProvider clientId={process.env.PUBLIC_GOOGLE_API_KEY!}>
        <main className="flex justify-start items-center flex-col h-screen">
          <div className="relative w-full h-full">
            <video
              src="/share.webm"
              loop
              controls={false}
              muted
              autoPlay
              className="w-full h-full object-cover"
            />
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
              <div className="p-5">
                <Image
                  src="/logo-white.avif"
                  alt="Logo"
                  priority
                  height={130}
                  width={130}
                />
              </div>
              <div className="shadow-2xl">
                <GoogleLoginButton handler={addUserToDB} />
              </div>
            </div>
          </div>
        </main>
      </GoogleOAuthProvider>
    </body>
  );
}
