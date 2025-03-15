"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import {
  LogIn,
  User,
  LogOut,
  Settings,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function UserProfile({
  session,
  status,
  userNameStyle,
  userEmailStyle,
}: {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
  userNameStyle?: string;
  userEmailStyle?: string;
}) {
  return (
    <div>
      <div className="flex items-center">
        {status === "authenticated" ? (
          <div className="flex items-center">
            <div className="hidden md:flex flex-col mr-4 text-right">
              <span className={`${userNameStyle}`}>{session?.user?.name}</span>
              <span className={`${userEmailStyle}`}>
                {session?.user?.email}
              </span>
            </div>

            <Menubar className="border-0 bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer data-[state=open]:bg-slate-700 focus:bg-slate-700 hover:bg-slate-700 border-0 p-0">
                  {session?.user?.image ? (
                    <div className="relative">
                      <Image
                        src={session.user.image}
                        alt="profile image"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-white"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-white">
                      <User size={20} className="text-white" />
                    </div>
                  )}
                </MenubarTrigger>

                <MenubarContent
                  className="bg-slate-800 border border-slate-700 text-white min-w-[200px] mr-2 lg:mr-0"
                  align="end"
                  sideOffset={8}
                >
                  <div className="px-2 py-1.5 border-b border-slate-700 mb-1">
                    <p className="text-sm font-medium">{session?.user?.name}</p>
                    <p className="text-xs text-slate-400">
                      {session?.user?.email}
                    </p>
                  </div>

                  <MenubarItem className="flex items-center text-white focus:bg-slate-700 focus:text-white">
                    <Link
                      href={`${
                        session?.user.role === "student"
                          ? "/student"
                          : session?.user.role === "teacher"
                          ? "/teacher"
                          : session?.user.role === "admin"
                          ? "/admin"
                          : "/"
                      }`}
                      className="flex items-center w-full"
                    >
                      <LayoutDashboard size={16} className="mr-2" />
                      <span>Dashboard</span>
                    </Link>
                  </MenubarItem>

                  <MenubarItem className="flex items-center text-white focus:bg-slate-700 focus:text-white">
                    <Link href="/profile" className="flex items-center w-full">
                      <User size={16} className="mr-2" />
                      <span>Profile</span>
                    </Link>
                  </MenubarItem>

                  <MenubarItem className="flex items-center text-white focus:bg-slate-700 focus:text-white">
                    <Link
                      href="/my-courses"
                      className="flex items-center w-full"
                    >
                      <BookOpen size={16} className="mr-2" />
                      <span>My Courses</span>
                    </Link>
                  </MenubarItem>

                  <MenubarItem className="flex items-center text-white focus:bg-slate-700 focus:text-white">
                    <Link href="/settings" className="flex items-center w-full">
                      <Settings size={16} className="mr-2" />
                      <span>Settings</span>
                    </Link>
                  </MenubarItem>

                  <MenubarSeparator className="bg-slate-700" />

                  <MenubarItem
                    className="flex items-center text-red-400 focus:bg-slate-700 focus:text-red-400"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        ) : (
          <Button
            variant="outline"
            className="bg-[#DAD7E2] text-[#1F1B2A] w-28 rounded-2xl text-sm border-white hover:bg-white hover:text-blue-800"
          >
            <Link href="/login" className="flex items-center">
              <LogIn size={16} className="mr-1" /> Login
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
