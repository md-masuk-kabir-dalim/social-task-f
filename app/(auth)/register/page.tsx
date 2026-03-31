"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useInput } from "@/lib/hooks";
import { setUser } from "@/lib/store/authSlice";
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
import { User } from "@/types";

export default function RegisterPage() {
  const nameInput = useInput({
    onValidate: (value) => {
      if (!value) return "Name is required";
      if (value.length < 2) return "Name must be at least 2 characters";
      return null;
    },
  });

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

  const confirmPasswordInput = useInput({
    onValidate: (value) => {
      if (!value) return "Please confirm your password";
      if (value !== passwordInput.value) return "Passwords do not match";
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

    if (
      !nameInput.isValid ||
      !emailInput.isValid ||
      !passwordInput.isValid ||
      !confirmPasswordInput.isValid
    ) {
      nameInput.handleBlur();
      emailInput.handleBlur();
      passwordInput.handleBlur();
      confirmPasswordInput.handleBlur();
      return;
    }

    setLoading(true);

    // Mock user creation
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: nameInput.value,
      email: emailInput.value,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nameInput.value}`,
    };

    setTimeout(() => {
      dispatch(setUser(newUser));
      router.push("/feed");
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background/90 to-muted/90 p-4 sm:p-6">
      <Card className="w-full max-w-md shadow-xl border border-border rounded-2xl">
        <CardHeader className="space-y-2 py-2 text-center">
          <CardTitle className="text-2xl sm:text-3xl font-semibold">
            Create Account 🎉
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Join SocialHub and connect with amazing people
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
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={nameInput.value}
              onChange={nameInput.handleChange}
              onBlur={nameInput.handleBlur}
              error={nameInput.error}
              required
              autoComplete="name"
            />

            <FormInput
              label="Email"
              type="email"
              placeholder="john@example.com"
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
              autoComplete="new-password"
              helperText="Must be at least 6 characters"
            />

            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPasswordInput.value}
              onChange={confirmPasswordInput.handleChange}
              onBlur={confirmPasswordInput.handleBlur}
              error={confirmPasswordInput.error}
              required
              autoComplete="new-password"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base h-10 flex items-center justify-center"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
