'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { FaHome, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

export function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg md:text-xl text-foreground hover:text-primary transition-colors">
          SocialHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <Link href="/feed">
                <Button variant="ghost" size="sm" className="gap-2">
                  <FaHome className="w-4 h-4" />
                  <span className="hidden sm:inline">Feed</span>
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <FaUser className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">{user.name}</span>
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
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
          {menuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-2">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  <span className="font-medium text-foreground">{user.name}</span>
                </div>
                <Link href="/feed" className="block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 w-full justify-start"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaHome className="w-4 h-4" />
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
                    <FaUser className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
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
