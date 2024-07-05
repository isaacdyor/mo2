import { type IconName } from "@/components/icons";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/sidebar/mobile-nav";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export type Route = {
  href: string;
  title: string;
  icon: IconName;
};

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const routes: Route[] = [
    { href: "/planner", title: "Dashboard", icon: "house" },
    { href: "/chat", title: "Chat", icon: "message-square" },
    { href: "/stats", title: "Stats", icon: "bar-chart-4" },
    { href: "/tasks", title: "Tasks", icon: "clipboard-check" },
    { href: "/habits", title: "Habits", icon: "repeat" },
    { href: "/settings", title: "Settings", icon: "settings" },
    { href: "/contact-support", title: "Contact Support", icon: "circle-help" },
  ];

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="w-full flex-none md:w-[220px] lg:w-[280px]">
        <Sidebar routes={routes} user={data.user} />
      </div>
      <div className="border-border flex items-center justify-between border-b px-5 py-3">
        <Link href="/" className="text-xl font-semibold">
          Mo
        </Link>
        <MobileNav routes={routes} user={data.user} />
      </div>
      {children}
    </div>
  );
};

export default RootLayout;
