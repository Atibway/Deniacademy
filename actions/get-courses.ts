"use server"

import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { currentUser } from "@/lib/auth";



type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapter: {id: string} [];
    progress: number | null
};

type GetCourses = {
    userId: string | undefined;
    title?: string;
    categoryId?: string
}

export const getCourses = async ({
    userId,
    title,
    categoryId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished:true,
                title:{
                    contains: title,
                },
                categoryId,
            },
            include:{
                category: true,
                chapter:{
                 where:{
                    isPublished: true,
                 }  ,
                 select:{
                    id:true
                 } 
                },
                purchases:{
                    where:{
                        userId,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        const coursesWithProgress:CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async course => {
                if(course.purchases.length > 1 || course.price < 1) {
                    const progressPercentage = await getProgress(userId, course.id);

                    return {
                        ...course,
                        progress: progressPercentage
                    }
                }
              


                return {
                    ...course,
                        progress: null
                }
            })
        );

        return coursesWithProgress;
    } catch (error) {
        console.log("[GET_COURSE]", error);
        return []
        
    }

    
}

