"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      <h1>Hello Nexjs API</h1>
      User is {status}
      {status === "authenticated" && (
        <>
          <h1>Username:{session.user?.name}</h1>
          <h1>Email:{session.user?.email}</h1>

          <Image
            src={`/${session.user?.image}}`}
            alt="profile image"
            width={50}
            height={50}
          />
        </>
      )}
      {session ? (
        <Button onClick={() => signOut({ callbackUrl: "/login" })}>
          Logout
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
