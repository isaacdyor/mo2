"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/client";

import { getInitials } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

export const ProfileButton: React.FC<{ user: User | null }> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const ref = React.useRef<HTMLDivElement>(null);

  // close the modal if we click outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);

  if (!user) return null;

  return (
    <div ref={ref} className="hidden sm:block">
      <Avatar
        className="hover:cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <AvatarImage
          src={
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2JDKbwuIrUJMvxpmG2H9Iw&ust=1720052915847000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCYiMrOiYcDFQAAAAAdAAAAABAE"
          }
        />
        {/* <AvatarImage src={user.imageUrl} /> */}
        <AvatarFallback>
          {/* {getInitials(user.firstName, user.lastName)} */}
          {getInitials("Isaac", "Dyor")}
        </AvatarFallback>
      </Avatar>

      {menuOpen && (
        // <div className="absolute right-5 top-16 z-50 flex w-72 flex-col rounded-lg bg-secondary bg-opacity-80 p-4">
        <div className="border-border bg-background absolute right-5 top-16 z-50 flex w-72 flex-col rounded-lg border bg-opacity-80 p-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="pr-4">
                <Avatar onClick={() => setMenuOpen(!menuOpen)}>
                  <AvatarImage
                    src={
                      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2JDKbwuIrUJMvxpmG2H9Iw&ust=1720052915847000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCYiMrOiYcDFQAAAAAdAAAAABAE"
                    }
                  />
                  {/* <AvatarImage src={user.imageUrl} /> */}
                  <AvatarFallback>
                    {/* {getInitials(user.firstName, user.lastName)} */}
                    {getInitials("Isaac", "Dyor")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <p className="text-xl">
                  {/* {user.firstName} {user.lastName} */}
                  Isaac Dyor
                </p>
                <p className="text-md text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
          <hr className="border-border my-4 border-t" />
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground text-lg">
              <Link
                onClick={() => setMenuOpen(false)}
                className="hover:text-muted-foreground/70"
                href="/profile"
              >
                Profile
              </Link>
            </p>

            <Link
              onClick={() => setMenuOpen(false)}
              className="text-muted-foreground hover:text-muted-foreground/70 text-lg"
              href="/settings"
            >
              Settings
            </Link>
            <p
              onClick={() =>
                signOut().then(() => {
                  setMenuOpen(false);

                  router.refresh();
                })
              }
              className="text-muted-foreground hover:text-muted-foreground/70 text-lg hover:cursor-pointer"
            >
              Sign out
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
