"use client";
import Button from "@/components/tiffui/Button";
import { useUser } from "@/hooks/useUser";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

export default function LandingPage() {
  const { user, isPending, session, isError, error } = useUser();
  console.log("SESSION", session);

  console.log(user);
  const renderContent = () => {
    if (isPending) {
      return (
        <h2 className="text-2xl font-semibold text-[#b5bac1]">
          Loading your vibe...
        </h2>
      );
    }

    if (
      isError ||
      !session ||
      !user ||
      user === undefined ||
      session === undefined
    ) {
      return (
        <div>
          <h2 className="text-2xl font-semibold text-red-400">
            Oops! Something went wrong. {error?.message || "Try refreshing?"}
            Sign in or sign up to continue.
          </h2>
          <Flex gap="2" className="flex gap-2 mt-4">
            <Button asChild variant="outline">
              <Link href="/sign-in">Login to Tiff</Link>
            </Button>
            <Button asChild variant="default">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </Flex>
        </div>
      );
    }

    if (user) {
      return (
        <>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Welcome back, {user.name || "Friend"} 👋
          </h2>
          <p className="text-[#b5bac1] text-base mb-8 max-w-md">
            We’re stoked to have you here. Jump into your communities, catch up
            with friends, or start a fresh new Tiff.
          </p>
          <Button
            className="bg-[#5865f2] hover:bg-[#4752c4] px-6 py-3 rounded-md font-medium text-sm transition-colors shadow-md"
            asChild
          >
            <Link href={"/servers"}>Open Tiff on Browser</Link>
          </Button>
        </>
      );
    }

    return (
      <>
        <h2 className="text-4xl font-bold mb-4 leading-tight">
          A new way to argue with your friends.
        </h2>
        <p className="text-[#b5bac1] text-base mb-8 max-w-md">
          Connect with your friends and communities in real-time. Tiff makes it
          easy to chat, share, and debate with the people who matter most.
        </p>
        <Flex gap="2" className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/sign-in">Login to Tiff</Link>
          </Button>
          <Button asChild variant="default">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </Flex>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#1e1f22] text-white font-sans">
      <header className="py-6 px-8 border-b border-[#2b2d31] shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Tiff</h1>
          <nav>
            <ul className="flex space-x-6 text-sm">
              <li>
                <a href="#" className="hover:text-[#dbdee1] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dbdee1] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dbdee1] transition-colors">
                  About
                </a>
              </li>
            </ul>
          </nav>
          {!user && (
            <Button className="bg-[#5865f2] hover:bg-[#4752c4] px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-md">
              Login
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">{renderContent()}</div>

          <div className="md:w-1/2">
            <div className="bg-[#2b2d31] rounded-xl overflow-hidden shadow-lg border border-[#3a3c41]">
              <div className="aspect-video bg-[#1e1f22] flex items-center justify-center">
                <CldImage
                  alt="Tiff"
                  src="server_2_lls2sj" // Use this sample image or upload your own via the Media Explorer
                  width="500" // Transform the image: auto-crop to square aspect_ratio
                  height="500"
                  crop={{
                    type: "auto",
                    source: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
