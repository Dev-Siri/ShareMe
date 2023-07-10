"use client";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

interface Props {
  handler(credentialsToken: string): Promise<void>;
}

export default function GoogleLoginButton({ handler }: Props) {
  function responseGoogle({ credential }: CredentialResponse) {
    if (!credential)
      return alert("Your Google credentials could not be found.");

    handler(credential);
  }

  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onError={() => alert("Failed to login with Google")}
    />
  );
}
