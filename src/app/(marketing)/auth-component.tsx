import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";

const AuthComponent = async () => {
  const supabase = createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (authUser) {
    return (
      <Link
        href="/dashboard"
        className={buttonVariants({ variant: "outline" })}
      >
        Dashboard
        <Icons.chevronRight className="ml-1 h-4 w-4" />
      </Link>
    );
  } else {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link href={"/login"} className="w-full sm:w-auto">
          <Button variant="secondary" size="sm" className="w-full">
            Log In
          </Button>
        </Link>
        <Link href="/signup" className="w-full sm:w-auto">
          <Button variant="default" size="sm" className="w-full">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }
};

export default AuthComponent;
