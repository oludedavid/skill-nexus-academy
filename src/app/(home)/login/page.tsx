import { redirect } from "next/navigation";
import { getAuthSession } from "@/app/actions";
import LoginForm from "@/ui/login";
import LoginWithSocials from "@/ui/socialLogin";

export default async function LoginPage() {
  const session = await getAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#10192B] to-[#1F2B48] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <LoginForm />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1A2434] text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <LoginWithSocials />
      </div>
    </div>
  );
}
