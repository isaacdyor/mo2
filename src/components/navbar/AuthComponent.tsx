import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProfileButton } from "./ProfileButton";

const AuthComponent = async () => {
  const supabase = createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (authUser) {
    // const user = await api.users.getCurrent.query();
    return <ProfileButton user={authUser} />;
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
