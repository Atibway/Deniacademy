// components/WelcomeBanner.js
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const headingFont = localFont({
  src: "../../../../../public/fonts/CalSans.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ]
})

export default function WelcomeBanner() {
  return (
    <div className="bg-white flex flex-col md:flex-row items-center md:p-10 rounded-lg shadow-2xl mx-4 dark:bg-gray-900 pb-2 space-y-6 md:space-y-0 md:space-x-10">
      {/* Image Section */}
      <div>
        <Image
          src="/image.png"
          alt="NanoAcersemy Logo"
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>

      {/* Text Section */}
      <div className="text-center md:text-left">
        <h1 className={cn("md:text-4xl text-3xl font-bold mb-4",
        headingFont.className
        )}>
          Welcome to <span className="text-primary ">DeniAcademy</span>
        </h1>
        <div className={cn(textFont.className)}>
        <p className="text-xl font-medium mb-2">
          Your Gateway to Mastering Real-World Skills
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Explore, Learn, and Build Real-Life Projects
        </p>
        </div>
        <Link
          href="https://youtube.com/@nanobyte256?si=NvQPAA8pbEE9MVGN"
          target="_blank"
          className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
        >
          <svg
            className="w-6 h-6 mr-2 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M21.8 8s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.2 5 12 5 12 5s-4.2 0-6.9.1c-.4 0-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.6.7 2 .9 1.5.2 6.8.1 6.8.1s4.2 0 6.9-.1c.4 0 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2V11.2c0-1.6-.2-3.2-.2-3.2zM10 14.8V9.2l5.2 2.8L10 14.8z" />
          </svg>
          Subscribe to Our Channel
        </Link>
      </div>
    </div>
  );
}
