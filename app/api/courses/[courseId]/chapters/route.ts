import {  currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    {params}: {params: {courseId: string}}
) {
    try {
    const user = await currentUser();
    const {title} = await req.json();

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

    const lastChapter = await db.chapter.findFirst({
        where: {
          courseId: params.courseId,
        },
        orderBy: {
          position: "desc"
        }
      });
      
      const newPosition = lastChapter ? lastChapter.position + 1 : 1;
      

    const chapter = await db.chapter.create(
        {
            data: {
                title,
                userId: user.id,
                courseId: params.courseId ,
                position: newPosition
            }
        }
    )
    
    return NextResponse.json(chapter)
} catch (error) {
    console.log("[CHAPTERS]", error);
    
    return new  NextResponse("Internal Error", {status:500})
}

}