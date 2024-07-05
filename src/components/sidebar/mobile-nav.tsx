import { type Route } from "@/app/(dashboard)/layout";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Icon } from "../icons";
import { ProfileButton } from "./profile-button";

export const MobileNav: React.FC<{ routes: Route[]; user: User }> = async ({
  routes,
  user,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className=" flex flex-col justify-between">
        <SheetHeader className="hidden">
          <SheetTitle>Mobile Dashboard</SheetTitle>
          <SheetDescription>Navigate on mobile</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <Link href="/" className="m-2 border-b p-2 text-xl font-semibold">
            Mo
          </Link>
          <nav className="flex flex-col gap-2 text-lg font-medium">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              >
                <Icon name={route.icon} className="h-5 w-5" />
                {route.title}
              </Link>
            ))}
          </nav>
        </div>
        <ProfileButton user={user} />
      </SheetContent>
    </Sheet>
  );
};
