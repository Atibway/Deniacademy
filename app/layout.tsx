import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { ConfettiProvider } from "@/components/providers/confetti-providerr";
import { siteConfing } from "@/config/site";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";



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

export const metadata: Metadata = {
  title: {
    default: siteConfing.name,
    template: `%s | ${siteConfing.name}`
  },
  description: siteConfing.description,
  icons:[
     {
      url:"/logo.svg",
       href:"/logo.svg"
     } 
    
  ]
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
<SessionProvider session={session}>

    <html lang="en">
      <body
        className={cn(textFont.className)}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ConfettiProvider/>
<ToastProvider/>
<Toaster/>
<ModalProvider/>
        {children}
          </ThemeProvider>
      </body>
    </html>
</SessionProvider>
  );
}
