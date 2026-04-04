"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { icons } from "@/constants/icons";
import { useAuth } from "@/redux/hooks";
import Image from "next/image";
import { useCreateResourceMutation } from "@/redux/api/commonApi";
import { authRoutes } from "@/constants/end-point";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logout] = useCreateResourceMutation();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout({
        url: authRoutes.logout,
        payload: {},
      }).unwrap?.();

      setMenuOpen(false);
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/facebook.png"
            alt="Logo"
            width={32}
            height={32}
            className="hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <Link href="/feed">
                <Button variant="ghost" size="sm" className="gap-2">
                  <icons.HomeIcons className="w-4 h-4" />
                  <span className="hidden sm:inline">Feed</span>
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <icons.UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={handleLogout}
              >
                Logout
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user.fullName}
                </span>
                <img
                  src={user.image}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <icons.TimesIcons className="w-5 h-5" />
          ) : (
            <icons.BarsIcons className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-2">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <img
                    src={user.image}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium text-foreground">
                    {user.fullName}
                  </span>
                </div>
                <Link href="/feed" className="block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 w-full justify-start"
                    onClick={() => setMenuOpen(false)}
                  >
                    <icons.HomeIcons className="w-4 h-4" />
                    Feed
                  </Button>
                </Link>
                <Link href="/profile" className="block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 w-full justify-start"
                    onClick={() => setMenuOpen(false)}
                  >
                    <icons.UserIcon className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 w-full justify-start"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
