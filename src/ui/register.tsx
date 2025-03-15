"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Spinner from "./spinner";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, UserCircle2, UserSquare2 } from "lucide-react";

const roles = ["student", "teacher"];

const registerFormSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters."),
    role: z.string().nonempty("Please select a role"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

export default function RegistrationForm() {
  const [loading, setLoading] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setLoading(true);
    try {
      console.log(values);
      await postUserData(values);
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function postUserData(data: z.infer<typeof registerFormSchema>) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register/`,
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#10192B] to-[#1F2B48] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-lg bg-[#1A2434] text-white">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-[#DAD7E2]">
              Join SkillNexus Academy
            </CardTitle>
            <p className="text-sm text-gray-400">
              Start your learning journey today
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="John Doe"
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
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          Applying as
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <div className="relative">
                              <UserSquare2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                              <SelectTrigger className="pl-10 bg-[#10192B] border-gray-700 text-white focus:ring-[#663FD6] focus:border-[#663FD6]">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent className="bg-[#10192B] border-gray-700 text-white">
                            {roles.map((role) => (
                              <SelectItem
                                key={role}
                                value={role}
                                className="hover:bg-[#663FD6] focus:bg-[#663FD6]"
                              >
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          Password
                        </FormLabel>
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

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          Confirm Password
                        </FormLabel>
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

                <Button
                  type="submit"
                  className="w-full bg-[#663FD6] hover:bg-[#552EC4] text-white font-semibold py-2 transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner size="sm" className="text-white" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#663FD6] hover:text-[#552EC4] font-medium"
              >
                Sign in here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
