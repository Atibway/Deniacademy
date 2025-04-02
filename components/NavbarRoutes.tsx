
"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "./auth/user-button";
import { ModeToggle } from "./modeToggler";
import { SearchInput } from "./search-input";
import Link from "next/link";
import { LogOut } from "lucide-react";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const isSearchPage = pathname === "/";

  return (
    <div className="flex items-center w-full px-4">
      {isSearchPage && (
        <div className="flex-1">
          <SearchInput />
        </div>
      )}
      {pathname.startsWith("/courses") && (
        <div>
           <button
            type="button"
            className={
                "flex items-center gap-x-2  text-sm font-bold px-6 hover:rounded-lg transition-all text-muted-foreground hover:text-slate-900 hover:bg-slate-300/20"
               }
            >
        <div className="flex  items-center gap-x-2 ">
        <Link
             href={"/"}
            className='flex  items-center gap-x-2 py-4'
             >
              <LogOut size={22} className="text-muted-foreground dark:text-white"/>
              Exit
             </Link>
          
        </div>
        
            </button>
        </div>
      )}
      <div className="flex items-center  gap-x-2 ml-auto">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};
