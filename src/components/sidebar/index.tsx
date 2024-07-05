import { type Route } from "@/app/(dashboard)/layout";
import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import React from "react";
import { Icon } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProfileButton } from "./profile-button";

export const Sidebar: React.FC<{ routes: Route[]; user: User }> = ({
  routes,
  user,
}) => {
  return (
    <aside className="bg-muted/40 hidden h-full border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 p-4">
        <div className="flex h-14 items-center border-b">
          <Link href="/" className="px-2 text-xl font-semibold">
            Mo
          </Link>
        </div>
        <div className="flex-1">
          <nav className="flex flex-col gap-2 px-1 text-sm font-medium">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg py-2 transition-all"
              >
                <Icon name={route.icon} className="h-5 w-5" />
                {route.title}
              </Link>
            ))}
          </nav>
        </div>
        <ProfileButton user={user} />
      </div>
    </aside>
  );
};
