import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string; chapterId: string}}
    ){try {
        const user = await currentUser();
            if(!user?.id) {
                return new NextResponse("Unauthorized", {status: 4001})
            }
        
            const courseOwner = await db.course.findUnique({
                where: {
                    id: params.courseId,
                    userId: user.id
                }
            })
    
            if(!courseOwner){
        return new NextResponse("Unauthorized", {status:401})
            }

            
 const publishedChapter = await db.chapter.update({
    where:{
        id: params.chapterId,
        courseId: params.courseId
    },
    data:{
        isPublished: false
    }
 })

 const publishedChaptersInCourse = await db.chapter.findMany({
    where: {
        courseId: params.courseId,
        isPublished: true
    }
    
})

if(!publishedChaptersInCourse.length){
        await db.course.update({
      where:{
    id:params.courseId },
     data:{
   isPublished: false }
})
}
 return NextResponse.json(publishedChapter)
    } catch (error) {
        console.log("COURSE_CHAPTER_PUBLISH", error);
        return new NextResponse("Internal Error", {status: 500})
    }
            
        }