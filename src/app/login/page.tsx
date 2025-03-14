import { redirect } from "next/navigation";
import { getAuthSession } from "../actions";
import LoginForm from "@/ui/login";
import LoginWithSocials from "@/ui/socialLogin";

export default async function LoginPage() {
  const session = await getAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <LoginForm />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <LoginWithSocials />
      </div>
    </div>
  );
}
