"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Spinner from "./spinner";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        window.location.href = result?.url || "/";
      }
      reset();
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-[#1A2434] text-white">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-[#DAD7E2]">
          Welcome Back to SkillNexus
        </CardTitle>
        <p className="text-sm text-gray-400">Continue your learning journey</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <p className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded-lg">
                {error}
              </p>
            )}

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="john@example.com"
                          {...field}
                          className="pl-10 bg-[#10192B] border-gray-700 text-white focus:border-[#663FD6] focus:ring-[#663FD6]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="pl-10 bg-[#10192B] border-gray-700 text-white focus:border-[#663FD6] focus:ring-[#663FD6]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-sm text-right">
              <Link
                href="/forgot-password"
                className="font-medium text-[#663FD6] hover:text-[#552EC4] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#663FD6] hover:bg-[#552EC4] text-white font-semibold py-2 transition-all"
              disabled={loading}
            >
              {loading ? (
                <Spinner size="sm" className="text-white" />
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-sm text-center text-gray-400">
              Do not have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-[#663FD6] hover:text-[#552EC4] transition-colors"
              >
                Create account
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
