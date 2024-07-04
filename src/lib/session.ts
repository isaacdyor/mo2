import { createClient } from "@/utils/supabase/server";

export const getCurrentUser = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }
  return data;
};
