import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) {
    redirect("/login");
  }
  return (
    <div>
      <p>Hello {data.user.email}</p>
    </div>
  );
}
