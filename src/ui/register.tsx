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

const roles = ["student", "teacher"];

const registerFormSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters."),
    userRole: z.string().nonempty("Please select a role"),
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
      userRole: "",
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
    <div className="max-w-md mx-auto py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applying as?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {loading ? <Spinner size="sm" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
