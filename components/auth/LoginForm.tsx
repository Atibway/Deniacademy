
"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FormError } from "../form-error";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider"
      : "";

  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = (provider) => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 via-blue-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Card className="w-full max-w-md shadow-2xl rounded-lg overflow-hidden">
        <CardHeader className="bg-white dark:bg-gray-800 text-center py-6">
          <CardTitle className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white dark:bg-gray-800 px-6 py-8">
          {/* Google Login Button */}
          <Button
            size="lg"
            className="w-full flex items-center justify-center bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            onClick={() => onClick("google")}
          >
            <FcGoogle className="mr-3 h-6 w-6" />
            Continue with Google
          </Button>

          {/* Display Error if any */}
          {urlError && <FormError message={urlError} />}

          {/* GitHub Login Button */}
          <Button
            size="lg"
            className="w-full mt-4 flex items-center justify-center bg-gray-800 text-white hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            onClick={() => onClick("github")}
          >
            <FaGithub className="mr-3 h-6 w-6" />
            Continue with GitHub
          </Button>
        </CardContent>
        <CardFooter className="bg-white dark:bg-gray-800 px-6 py-4">
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            By logging in, you agree to our{" "}
            <a
              href="/terms"
              className="underline hover:text-gray-800 dark:hover:text-gray-200"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline hover:text-gray-800 dark:hover:text-gray-200"
            >
              Privacy Policy
            </a>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
