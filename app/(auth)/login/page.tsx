"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useInput } from "@/lib/hooks";
import { setUser } from "@/lib/store/authSlice";
import { mockUsers } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput } from "@/components/shared";
import Link from "next/link";

export default function LoginPage() {
  const emailInput = useInput({
    onValidate: (value) => {
      if (!value) return "Email is required";
      if (!value.includes("@")) return "Please enter a valid email";
      return null;
    },
  });

  const passwordInput = useInput({
    onValidate: (value) => {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return null;
    },
  });

  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    // Validate inputs
    if (!emailInput.isValid || !passwordInput.isValid) {
      emailInput.handleBlur();
      passwordInput.handleBlur();
      return;
    }

    setLoading(true);

    // Mock authentication - find user by email
    const user = mockUsers.find((u) => u.email === emailInput.value);

    if (!user) {
      setGeneralError("No account found with this email.");
      setLoading(false);
      return;
    }

    // Simulate delay for better UX
    setTimeout(() => {
      dispatch(setUser(user));
      router.push("/feed");
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4 sm:p-6">
      <Card className="w-full max-w-md shadow-lg border border-border rounded-md">
        <CardHeader className="space-y-2 py-2 text-center">
          <CardTitle className="text-2xl font-semibold">
            Welcome Back 👋
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign in to your SocialHub account
          </CardDescription>
        </CardHeader>

        <CardContent className="py-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            {generalError && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-md">
                {generalError}
              </div>
            )}

            <FormInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={emailInput.value}
              onChange={emailInput.handleChange}
              onBlur={emailInput.handleBlur}
              error={emailInput.error}
              required
              autoComplete="email"
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={passwordInput.value}
              onChange={passwordInput.handleChange}
              onBlur={passwordInput.handleBlur}
              error={passwordInput.error}
              required
              autoComplete="current-password"
            />

            <p className="text-xs text-muted-foreground leading-relaxed">
              Demo credentials: Try emails like sarah@example.com,
              marcus@example.com, emma@example.com, alex@example.com. Use any
              password ≥6 characters.
            </p>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base h-10 flex items-center justify-center"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
