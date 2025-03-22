"use client";

import { TmenuItems } from "@/types/menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/ui/dashboardSidebar";
import UserProfile from "@/ui/userProfile";
import { useSession } from "next-auth/react";

import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Clock,
  MessageSquare,
  Settings,
} from "lucide-react";

export const teacherMenuItems: TmenuItems = [
  { url: "/tutor", name: "Dashboard", icon: LayoutDashboard },
  { url: "/tutor/projects", name: "My Profile", icon: Briefcase },
  { url: "/tutor/courses", name: "My Courses", icon: FileText },
  { url: "/tutor/my-students", name: "My Students", icon: Clock },
  { url: "/tutor/wallet", name: "Wallet", icon: MessageSquare },
  { url: "/tutor/settings", name: "Settings", icon: Settings },
];

export const studentMenuItems: TmenuItems = [
  { url: "/student", name: "Dashboard", icon: LayoutDashboard },
  { url: "/student/profile", name: "My Profile", icon: Briefcase },
  { url: "/student/courses", name: "My Courses", icon: FileText },
  { url: "/student/enrolled-courses", name: "Enrolled Courses", icon: Clock },
  { url: "/student/certificates", name: "Certificates", icon: MessageSquare },
  { url: "/student/settings", name: "Settings", icon: Settings },
];

export const adminMenuItems: TmenuItems = [
  { url: "/admin", name: "Dashboard", icon: LayoutDashboard },
  { url: "/admin/courses", name: "Courses", icon: Briefcase },
  { url: "/admin/teachers", name: "Teachers", icon: FileText },
  { url: "/admin/students", name: "Students", icon: Clock },
  { url: "/admin/certificates", name: "Certificates", icon: MessageSquare },
  { url: "/admin/wallet", name: "Wallet", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  return (
    <SidebarProvider defaultOpen={false} suppressContentEditableWarning>
      <DashboardSidebar
        menuItems={
          session?.user.role === "student"
            ? studentMenuItems
            : session?.user.role === "teacher"
            ? teacherMenuItems
            : session?.user.role === "admin"
            ? adminMenuItems
            : []
        }
      />

      <div className="flex flex-col min-h-screen w-full bg-[#10192B]">
        <header className="flex justify-between items-center p-4 shadow">
          <SidebarTrigger className="text-white" />
          <UserProfile
            userEmailStyle="text-white"
            userNameStyle="text-white"
            session={session}
            status={status}
          />
        </header>

        <main className="flex-1 p-6 overflow-auto text-white ">{children}</main>
      </div>
    </SidebarProvider>
  );
}
