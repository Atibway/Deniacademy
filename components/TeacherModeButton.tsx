"use client"

import React from 'react'

import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { useCurrentUser } from '@/hooks/use-current-user'

export const TeacherModeButton = () => {
    const user = useCurrentUser()
    const pathname = usePathname();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses")

  return (
    <div>
        {user && user.role === "ADMIN" && (
    
        <button
            type="button"
            className={
                "flex items-center gap-x-2  text-sm font-bold w-full px-6 transition-all text-muted-foreground hover:text-slate-900 hover:bg-slate-300/20"
               }
            >
        <div className="flex  items-center gap-x-2 ">
       
          {isTeacherPage || isCoursePage? (
             <Link
             href={"/"}
            className='flex  items-center gap-x-2 py-4'
             >
              <LogOut size={22} className="text-muted-foreground dark:text-white"/>
              Exit
             </Link>
          ): (
            <Link
            href={"/teacher/courses"}
            className='flex  items-center gap-x-2 py-4'
            >
    <FaChalkboardTeacher size={22} className="text-muted-foreground dark:text-white"/>
     <span className='text-[14.5px]'>Teacher mode</span> 
    
            </Link>
          )}
      
        </div>
        <div
        className={cn(
            "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
            isTeacherPage || isCoursePage && "opacity-100"
        )}
        />
            </button>
        )}
    </div>
    
  )
}
