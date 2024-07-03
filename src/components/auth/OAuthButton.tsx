"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import React, { useState } from "react";

const OauthButton: React.FC<{ provider: Provider }> = ({ provider }) => {
  const supabase = createClient();

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback?next=dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  if (provider === "google") {
    return (
      <Button
        variant="outline"
        className="text-muted-foreground mb-2 w-full font-normal"
        onClick={() => handleLogin().catch(console.error)}
      >
        <div className="flex items-center gap-2">
          <Icons.google className="h-5 w-5" />
          <p>Sign in with Google</p>
        </div>
      </Button>
    );
  }

  if (provider === "github") {
    return (
      <Button
        variant="outline"
        className="text-muted-foreground mb-2 w-full font-normal"
        onClick={handleLogin}
      >
        <div className="flex items-center gap-2">
          <Icons.gitHub className="h-5 w-5" />
          <p>Sign in with GitHub</p>
        </div>
      </Button>
    );
  }

  if (error) {
    return (
      <div className="border-destructive bg-destructive/10 mb-3 mt-1 rounded-md border p-3">
        <p className="text-destructive text-center text-sm font-medium">
          {error}
        </p>
      </div>
    );
  }
};

export default OauthButton;
