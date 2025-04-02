import { getProgress } from "@/actions/get-progress";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseSidebar from "./_components/CourseSidebar";
import { CourseNavbar } from "./_components/CourseNavbar";

export async function generateMetadata({
    params,
}:{
    params: {courseId: string;}
}) {
    
        const course = await db.course.findUnique({
            where:{
                id: params.courseId
            }
        })
    
  return {
    title: course?.title || "course"
  };
}

const CourseLayout = async({
    children,
    params
}: {
    children: React.ReactNode;
    params: {courseId: string}
}) => {
    const user = await currentUser();
    if(!user?.id){
        return redirect("/")
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include:{
            chapter:{
                where: {
                    isPublished:true,
                },
                include:{
                    userProgress:{
                        where: {
                            userId: user?.id
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    });

    if(!course){
        return redirect("/search")
    }

    const progressCount = await getProgress(user?.id, course.id)
    
    
  return (
    <div className="h-full dark:bg-primary-foreground text-black dark:text-white">
<div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
    <CourseNavbar
  course={course}
  progressCount= {progressCount}
    />
</div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
            <CourseSidebar
course={course}
progressCount={progressCount}
            />
        </div>
        <main className="md:pl-80 h-full pt-[80px] bg-white dark:bg-primary-foreground ">
        {children}
        </main>
    </div>
  )
}

export default CourseLayout