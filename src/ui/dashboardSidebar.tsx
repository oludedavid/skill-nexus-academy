"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { TmenuItems } from "@/types/menu";

export default function DashboardSideBar({
  menuItems,
}: {
  menuItems: TmenuItems;
}) {
  const pathName = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar className="sidebar" collapsible="icon">
      <SidebarHeader className="">
        {state === "collapsed" ? (
          <Logo className="w-8" logoName="SN" />
        ) : (
          <Logo className="w-32" logoName="SkillNexus" />
        )}
        <Logo className="" logoName="" />
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarMenu>
          {menuItems.map((menuItem, index) => {
            const isActive = pathName === menuItem.url;
            const Icon = menuItem.icon;

            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link
                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-red-50 text-gray-600"
                        : "hover:bg-white hover:text-black"
                    }`}
                    href={menuItem.url}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{menuItem.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {state === "collapsed" ? (
          <span> © </span>
        ) : (
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()} SkillNexusAcademy. All rights reserved.
          </span>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
