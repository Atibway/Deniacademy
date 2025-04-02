"use client"

import { BarChart, Compass, Layout, List, Mail } from "lucide-react"
import { SidebarItem } from "./SidebarItem"
import { usePathname } from "next/navigation"
import { TeacherModeButton } from "@/components/TeacherModeButton"
import { SidebarGuestButLoggedItem } from "./SidebarGuestButLoggedItem"


const guestRoutes = [
    
    {
        icon:Compass,
        label: "Browse Courses",
        href:"/"
    },
   
]

const guestButLoggedRoutes = [
    {
        icon:Layout,
        label: "Dashboard",
        href:"/dashboard"
    },
    {
        icon:Mail,
        label: "Newsletter",
        href:"/newsletter"
    },
]
const teacherRoutes = [
    {
        icon:List,
        label: "Courses",
        href:"/teacher/courses"
    },
    {
        icon:BarChart,
        label: "Analytics",
        href:"/teacher/analytics"
    },
]

export const SidebarRouts = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage? teacherRoutes: guestRoutes
  return (
    <div className="flex flex-col w-full">
        {routes.map((route)=> (

<SidebarItem
key={route.href}
icon={route.icon}
label={route.label}
href={route.href}
/>

        ))}
        {!isTeacherPage && guestButLoggedRoutes.map((route)=> (

<SidebarGuestButLoggedItem
key={route.href}
icon={route.icon}
label={route.label}
href={route.href}
/>

        ))}

        <TeacherModeButton/>
    </div>
  )
}
