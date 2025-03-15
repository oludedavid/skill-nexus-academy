"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
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

  return (
    <Sidebar className="sidebar">
      <SidebarHeader className="sideBarHeader flex items-center gap-2 ">
        <Logo
          className="font-bold text-2xl py-2"
          logoName="SkillNexusAcademy"
        />
      </SidebarHeader>
      <SidebarContent
        className="sideBarContent bg-[#10192B] text-white
       py-4"
      >
        <ul className="space-y-6">
          {menuItems.map((menuItem, index) => {
            const isActive = pathName === menuItem.url;
            const Icon = menuItem.icon;

            return (
              <li className="sideBarItems" key={index}>
                <Link
                  className={`p-3 flex items-center rounded-lg transition-colors ${
                    isActive
                      ? " bg-red-50 text-gray-600"
                      : "hover:bg-white hover:text-black"
                  }`}
                  href={menuItem.url}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {menuItem.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </SidebarContent>
      <SidebarFooter className="border-t pt-4">
        <span className="text-sm text-gray-500">
          © {new Date().getFullYear()} SkillNexusAcademy. All rights reserved.
        </span>
      </SidebarFooter>
    </Sidebar>
  );
}
