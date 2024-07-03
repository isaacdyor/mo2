"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginInput } from "./login/page";
import type { SignupInput } from "./signup/page";

const supabase = createClient();
const origin = headers().get("origin");

export const signUp = async (formData: SignupInput) => {
  "use server";
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    return {
      error: error.message,
    };
  }
};

export const signIn = async (data: LoginInput) => {
  "use server";

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
    options: {},
  });
  if (error) {
    return {
      error: error.message,
    };
  } else {
    redirect("auth/callback");
  }
};
