import Image from "next/image";
// import { redirect } from "next/navigation";

// import { client } from "@/lib/client";
import jwtDecode from "jwt-decode";
import GoogleLoginButton from "./google-login";

export interface GoogleUser {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

export interface SanityUser {
  userName: string;
  image: string;
  _id: string;
  userId?: string;
}

async function addUserToDB(credentialsToken: string) {
  "use server";

  const user = jwtDecode<GoogleUser>(credentialsToken);

  console.log(user);

  // const doc = {
  //   _id: googleId,
  //   _type: "user",
  //   userName: name,
  //   image: imageUrl,
  // };

  // await client.createIfNotExists(doc);

  // redirect("/");
}

export default function Login() {
  return (
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
            <Image src="/logo-white.avif" alt="Logo" height={130} width={130} />
          </div>
          <div className="shadow-2xl">
            <GoogleLoginButton handler={addUserToDB} />
          </div>
        </div>
      </div>
    </main>
  );
}
