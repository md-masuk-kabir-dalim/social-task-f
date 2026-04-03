"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useInput } from "@/hooks/useInput";
import { authRoutes } from "@/constants/end-point";
import { useCreateResourceMutation } from "@/redux/api/commonApi";

export default function RegisterPage() {
  const [registerUser] = useCreateResourceMutation();
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const firstNameInput = useInput({
    onValidate: (value) => {
      if (!value) return "First name is required";
      if (value.length < 2) return "Minimum 2 characters";
      return null;
    },
  });

  const lastNameInput = useInput({
    onValidate: (value) => {
      if (!value) return "Last name is required";
      return null;
    },
  });

  const emailInput = useInput({
    onValidate: (value) => {
      if (!value) return "Email is required";
      if (!value.includes("@")) return "Invalid email";
      return null;
    },
  });

  const passwordInput = useInput({
    onValidate: (value) => {
      if (!value) return "Password required";
      if (value.length < 6) return "Min 6 characters";
      return null;
    },
  });

  const confirmPasswordInput = useInput({
    onValidate: (value) => {
      if (!value) return "Confirm password";
      if (value !== passwordInput.value) return "Passwords do not match";
      return null;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    // validate
    if (
      !firstNameInput.isValid ||
      !lastNameInput.isValid ||
      !emailInput.isValid ||
      !passwordInput.isValid ||
      !confirmPasswordInput.isValid
    ) {
      firstNameInput.handleBlur();
      lastNameInput.handleBlur();
      emailInput.handleBlur();
      passwordInput.handleBlur();
      confirmPasswordInput.handleBlur();
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser({
        url: authRoutes.register,
        payload: {
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        },
      }).unwrap();
      const token = res.data?.token;
      router.push(`/verify-otp?token=${token}&email=${emailInput.value}`);
    } catch (err: any) {
      setGeneralError(err?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background/90 to-muted/90 p-4 sm:p-6">
      <Card className="w-full max-w-md shadow-xl border rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Create Account 🎉
          </CardTitle>
          <CardDescription>
            Join SocialHub and connect with people
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {generalError && (
              <div className="p-3 bg-red-100 text-red-500 rounded">
                {generalError}
              </div>
            )}

            <FormInput
              label="First Name"
              value={firstNameInput.value}
              onChange={firstNameInput.handleChange}
              onBlur={firstNameInput.handleBlur}
              error={firstNameInput.error}
              autoComplete="given-name"
            />

            <FormInput
              label="Last Name"
              value={lastNameInput.value}
              onChange={lastNameInput.handleChange}
              onBlur={lastNameInput.handleBlur}
              error={lastNameInput.error}
              autoComplete="family-name"
            />

            <FormInput
              label="Email"
              type="email"
              value={emailInput.value}
              onChange={emailInput.handleChange}
              onBlur={emailInput.handleBlur}
              error={emailInput.error}
              autoComplete="email"
            />

            <FormInput
              label="Password"
              type="password"
              value={passwordInput.value}
              onChange={passwordInput.handleChange}
              onBlur={passwordInput.handleBlur}
              error={passwordInput.error}
              autoComplete="new-password"
            />

            <FormInput
              label="Confirm Password"
              type="password"
              value={confirmPasswordInput.value}
              onChange={confirmPasswordInput.handleChange}
              onBlur={confirmPasswordInput.handleBlur}
              error={confirmPasswordInput.error}
              autoComplete="new-password"
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
