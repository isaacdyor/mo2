import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  console.log();
  return await updateSession(request);
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|$|login|signup|auth).*)",
};
