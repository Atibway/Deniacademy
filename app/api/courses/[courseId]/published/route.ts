import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string;}}
    ){try {
        const user = await currentUser();
            if(!user?.id) {
                return new NextResponse("Unauthorized", {status: 4001})
            }

            const course = await db.course.findUnique({
                where: {
                    id: params.courseId
                },
                include:{
                    chapter:true
                }
            })

            const hasPublishedChapter = course?.chapter.some((chapter)=> chapter.isPublished)

if(!course || !course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter){
return new NextResponse("Missing required fields", {status:400})
}
 const publishedCourse = await db.course.update({
    where:{
        id: params.courseId,
        userId: user.id
    },
    data:{
        isPublished: true
    }
 })
 return NextResponse.json(publishedCourse)
    } catch (error) {
        console.log("COURSE_COURSE_PUBLISH", error);
        return new NextResponse("Internal Error", {status: 500})
    }
            
        }