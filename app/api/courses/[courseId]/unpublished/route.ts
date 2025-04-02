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
                }
            })
            if(!course) {
                return new NextResponse("Unauthorized", {status: 4001})
            }
           
 const unpublishedCourse = await db.course.update({
    where:{
        id: params.courseId,
        userId: user.id
    },
    data:{
        isPublished: false
    }
 })
 return NextResponse.json(unpublishedCourse)
    } catch (error) {
        console.log("COURSE_COURSE_UNPUBLISH", error);
        return new NextResponse("Internal Error", {status: 500})
    }
            
        }