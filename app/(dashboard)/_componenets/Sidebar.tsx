
import React from 'react'
import { Logo } from './Logo'
import { SidebarRouts } from './SidebarRouts'

export const Sidebar = () => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm dark:bg-primary-foreground'>
        <div className='p-6'>
<Logo/>
        </div>
        <div className='flex flex-col w-full'>
<SidebarRouts/>
        </div>
    </div>
  )
}
