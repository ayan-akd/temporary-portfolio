import {
  LayoutGrid,
  LucideIcon,
  LayoutList,
  MailOpen
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/projects",
          label: "Projects",
          icon: LayoutList,
        },
        {
          href: "/dashboard/messages",
          label: "Messages",
          icon: MailOpen,
        }
      ]
    },
  ];
}
