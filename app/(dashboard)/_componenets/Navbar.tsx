
import React from 'react'
import { MobileSidebar } from './MobileSidebar'
import { NavbarRoutes } from '@/components/NavbarRoutes'

export const Navbar = () => {
  return (
    <div
    className='p-4 border-b h-full flex items-center bg-white dark:bg-primary-foreground dark:text-white shadow-sm'
    >
        <MobileSidebar/>
        

        <NavbarRoutes/>
        
    </div>
  )
}
