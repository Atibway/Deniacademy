import { NavbarRoutes } from "@/components/NavbarRoutes";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { CourseMobileSidebar } from "./CourseMobileSideba";

interface CourseNavbarProps {
    course: Course & {
        chapter: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
      }
      progressCount: number;
}

export const CourseNavbar = ({
course,
progressCount
}: CourseNavbarProps) => {
 
  return (
    <div className="p-4 border-b h-full flex items-center z-50 bg-white dark:bg-primary-foreground  shadow-sm">
      <CourseMobileSidebar
course={course}
progressCount={progressCount}
      />
<NavbarRoutes/>
    </div>
  )
}
