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
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="focus-visible:ring-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className="focus-visible:ring-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-sm text-right">
            <Link
              href="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Sign In"}
          </Button>

          <div className="text-sm text-center text-gray-600">
            You do not have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
