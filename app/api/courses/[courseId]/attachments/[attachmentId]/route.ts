import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function DELETE(
    req: Request,
    {params}: {params: {courseId: string, attachmentId: string}}
) {

    try {
        const user = await currentUser()
        if(!user?.id){
    return new NextResponse("Unauthorized", {status: 401})
        } 
        
         const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: user.id
            }
         })

         if(!courseOwner){
            return new NextResponse("Unauthorized", {status: 401})
                } 

                const attachment = await db.attachment.delete({
                    where: {
                        courseId: params.courseId,
                        id: params.attachmentId
                    }
                })

                return NextResponse.json(attachment);
    } catch (error) {
       console.log("ATTACHMENT_ID", error);
        
       return new NextResponse("Internal Error", {status: 500})
    }
}