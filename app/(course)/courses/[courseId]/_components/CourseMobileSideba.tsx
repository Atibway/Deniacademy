import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";
import CourseSidebar from "./CourseSidebar";

interface CourseNavbarProps {
    course: Course & {
        chapter: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
      }
      progressCount: number;
}

export const CourseMobileSidebar = ({
course,
progressCount
}:CourseNavbarProps) => {
  return (
    <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
            <Menu/>
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 bg-white dark:bg-primary-foreground w-72">
<CourseSidebar
course={course}
progressCount={progressCount}
/>
        </SheetContent>
    </Sheet>
  )
}
