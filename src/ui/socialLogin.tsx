// Updated LoginWithSocials component
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginWithSocials() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col space-y-4 w-full">
      {session ? (
        <Button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full bg-red-600 hover:bg-red-700 text-white transition duration-300"
        >
          Sign Out
        </Button>
      ) : (
        <>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            variant="outline"
            className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300"
          >
            <Image src="/google.png" alt="Google Logo" width={20} height={20} />
            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </Button>

          <Button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            variant="outline"
            className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300"
          >
            <Image src="/github.png" alt="Github Logo" width={20} height={20} />
            <span className="font-medium text-gray-700">
              Continue with GitHub
            </span>
          </Button>
        </>
      )}
    </div>
  );
}
