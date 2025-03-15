"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(16,25,43,1) 0%, rgba(54,84,145,1) 35%, rgba(16,25,43,1) 100%)",
        backgroundSize: "200% 200%",
      }}
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50"
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            You do not have permission to access this page. Please contact your
            administrator if you believe this is an error.
          </p>

          <p className="mt-6 text-sm text-gray-500">
            Redirecting to home page in {countdown} seconds...
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            onClick={() => router.back()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go Back
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
