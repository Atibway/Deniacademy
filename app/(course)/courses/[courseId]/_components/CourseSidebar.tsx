
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./CourseSidebarItem";
import CourseProgress from "./CourseProgress";

interface CourseSideBar {
    course: Course& {
        chapter: (Chapter & {
            userProgress: UserProgress[] | null;
        } )[]
    };
    progressCount: number;
}

const CourseSidebar = async({
course,
progressCount
}: CourseSideBar) => {
    const user = await currentUser();

    if(!user?.id){
        return redirect("/")
    }

    const purchase = await db.purchase.findFirst({
    where:{
            userId: user.id,
            courseId: course.id  
    }
    })

   

  return (
    <div className="h-full border-r flex flex-col bg-white dark:bg-primary-foreground overflow-y-auto shadow-sm">
<div className="p-8 flex flex-col border-b">
    <h1 className="font-semibold">
        {course.title}
    </h1>
    {(purchase || course.price < 1) && (
        <div className="mt-10">
<CourseProgress
variant="success"
value= {progressCount}
/>
        </div>
    )}
</div>
<div className="flex flex-col w-full">
    {course.chapter.map((chapter)=> (
        <CourseSidebarItem
   key={chapter.id}
   id={chapter.id}
   label={chapter.title}
   isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
   courseId={course.id}
   isLocked={!chapter.isFree && !purchase}
        />
    ))}
</div>
    </div>
  )
}

export default CourseSidebar