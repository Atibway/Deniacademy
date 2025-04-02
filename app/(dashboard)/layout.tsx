
import React from 'react'
import { Sidebar } from './_componenets/Sidebar';
import { Navbar } from './_componenets/Navbar';


const DashboardLayout = ({
    children
}:
{
    children: React.ReactNode;
}) => {
  
  return (
    <div className='h-full'>
      <div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
<Navbar/>
      </div>
        <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
<Sidebar/>
        </div>
        <main className='md:pl-56 min-h-[42rem] mt-[80px] bg-white text-black   dark:bg-primary-foreground dark:text-white'>
        {children}
        </main>
    </div>
  )
}

export default DashboardLayout