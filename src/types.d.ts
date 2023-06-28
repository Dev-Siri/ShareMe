import type { SanityAsset } from "@sanity/image-url/lib/types/types";

export interface GoogleUser {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  iat: number;
  exp: number;
  jti: string;
}

export interface SanityUser {
  userName: string;
  image: string;
  _id: string;
}

export interface SaveData {
  _key: string;
  postedBy: SanityUser;
}

export interface Pin {
  image: SanityAsset;
  _id: string;
  destination: string;
  postedBy: SanityUser;
  save?: SaveData[];
}
