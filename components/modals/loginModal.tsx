// components/LoginModal.js
"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useLoginModal } from "@/hooks/use-login";
import Link from "next/link";
import { LogInIcon } from "lucide-react";

export const LoginModal = () => {
  const loginModal = useLoginModal();

  const handleClose = () => {
    loginModal.onClose();
  };

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent className="max-w-md p-0 bg-slate-100 dark:bg-primary-foreground dark:text-white overflow-hidden rounded-lg">
   
        <div className="relative h-40">
          <Image
            src="/log-in.jpeg"
            alt="Please Log In"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <LogInIcon className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Please Log In to Continue
          </h2>
          <p className="text-center dark:text-muted-foreground text-gray-600">
            You need to be logged in to access this content.
          </p>

          <Link href="/auth/login">
            <Button
              onClick={handleClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Login
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
