
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
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

            const deletedChapter = await db.chapter.delete({
                where: {
                    id: params.chapterId
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
        id:params.courseId
    },
    data:{
        isPublished: true
    }
})
            }

            return NextResponse.json(deletedChapter)
    } catch (error) {
        console.log("COURSE_CHAPTER_DELETE", error);
        return new NextResponse("Internal Error", {status: 500})
    }
            
        }
export async function PATCH(
req: Request,
{params}: {params: {courseId: string; chapterId: string}}
){
    try {
        const user = await currentUser();
    const { ...values} = await req.json()
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

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data:{
                ...values,
            }
        })

    
      return NextResponse.json(chapter)
    } catch (error) {
      console.log("COURSE_CHAPTER_ID", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}