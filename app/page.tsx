"use client";
import Link from "next/link";
import { useAuth } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/common/Navbar";
import { FaHeart, FaComments, FaShare } from "react-icons/fa";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 text-foreground text-balance">
            Connect, Share, and Engage
          </h1>
          <p className="text-xl text-muted-foreground mb-12 text-balance max-w-2xl mx-auto">
            SocialHub is your platform to share ideas, connect with amazing
            people, and build meaningful relationships.
          </p>
          <div className="flex gap-4 justify-center">
            {isAuthenticated ? (
              <Link href="/feed">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Go to Feed
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Why Choose SocialHub?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FaHeart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Like & Engage
                </h3>
                <p className="text-muted-foreground">
                  Show appreciation for content you love with likes, comments,
                  and replies. Build genuine connections.
                </p>
              </div>
              <div className="bg-background p-8 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FaComments className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Meaningful Discussions
                </h3>
                <p className="text-muted-foreground">
                  Have thoughtful conversations with nested comments and
                  replies. Keep discussions organized and engaging.
                </p>
              </div>
              <div className="bg-background p-8 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FaShare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Easy Sharing
                </h3>
                <p className="text-muted-foreground">
                  Share posts with one click. Spread the word about content that
                  matters to you across your network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 text-balance">
            Sign up today and start connecting with people who share your
            interests.
          </p>
          {!isAuthenticated && (
            <Link href="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Create Account Now
              </Button>
            </Link>
          )}
        </section>
      </main>
    </div>
  );
}
