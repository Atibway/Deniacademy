"use server"
import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapter: { id: string }[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  courseInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    // Fetch purchased courses
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapter: {
              where: {
                isPublished: true,
              },
              include: {
                userProgress: {
                  where: {
                    userId: userId,
                  },
                },
              },
            },
          },
        },
      },
    });


const price: number | null = 0 || undefined
    // Fetch free or cheap courses
    const freeCourses = await db.course.findMany({
      where: {
        price: price,
        chapter: {
          some: {
            userProgress: {
              some: {
                userId: userId,
              },
            },
          },
        },
      },
      include: {
        category: true,
        chapter: {
          where: {
            isPublished: true,
          },
          include: {
            userProgress: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });


    // Combine purchased courses and free or cheap courses
    const allCourses = [
      ...purchasedCourses.map(purchase => ({ ...purchase.course, progress: null })),
      ...freeCourses.map(course => ({ ...course, progress: null }))
    ] as CourseWithProgressWithCategory[];

    // Calculate progress for each course
    for (let course of allCourses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }

    // Separate courses into completed and in-progress
    const completedCourses = allCourses.filter(course => course.progress === 100);
    const courseInProgress = allCourses.filter(course => (course.progress ?? 0) < 100);


    return {
      completedCourses,
      courseInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      courseInProgress: [],
    };
  }
};
