"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const ProfileButton: React.FC<{ user: User }> = ({ user }) => {
  const supabase = createClient();
  const router = useRouter();
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="hover:bg-secondary flex items-center gap-2 overflow-clip rounded-md p-2 text-lg hover:cursor-pointer md:text-base ">
          <Avatar className="h-7 w-7">
            <AvatarImage
              src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
              alt="@shadcn"
            />
            <AvatarFallback>Mo</AvatarFallback>
          </Avatar>
          <p className="text-muted-foreground text-md truncate">
            {user?.email}
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <div className="flex items-center justify-start gap-2 p-2 sm:w-60 md:w-40 lg:w-52">
          <div className="flex flex-col space-y-1 leading-none">
            {user.email && (
              <p className="text-muted-foreground truncate text-sm">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={async (event) => {
            event.preventDefault();
            await signOut();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
