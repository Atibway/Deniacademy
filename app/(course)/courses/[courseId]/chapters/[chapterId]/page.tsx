import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/banner';
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { CourseEnrollButton } from './_components/CourseEnrollButton';
import { Separator } from '@/components/ui/separator';
import { Preview } from '@/components/preview';
import { File } from 'lucide-react';
import { CourseProgressButton } from './_components/CourseProgressButton';
import { MagicUIvideo } from './_components/magic-ui-hero-video';

const ChapterIdPage = async({
    params
}:{
    params: {courseId: string; chapterId: string;}
}) => {
  const user = await currentUser();

  if(!user?.id){
    return redirect("/");
  }

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase
  } = await getChapter({
    userId: user.id,
    chapterId:params.chapterId,
    courseId:params.courseId
  });

  if(!chapter || !course){
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div className='dark:bg-primary-foreground'>
      {userProgress?.isCompleted && (
        <Banner
          variant={"success"}
          label='You already completed this chapter'
        />
      )}
      {isLocked && (
        <Banner
          variant={"warning"}
          label='You need to purchase this course to watch this chapter'
        />
      )}
      <div className='flex flex-col mx-auto pb-20 max-w-4xl'>
        <div className='p-4'>
          <MagicUIvideo
          chapterId={params.chapterId}
          title={chapter.title}
          courseId={params.courseId}
          nextChapterId={nextChapter?.id}
          isLocked={isLocked}
          completedOnEnd={completeOnEnd}
          chapter={chapter}
          courseImage={course.imageUrl}
          />
        </div>

        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className='text-2xl font-semibold mb-2'>
              {chapter.title}
            </h2>
            {!isLocked ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price}
              />
            )}
          </div>
          <Separator />
          {!isLocked && (
            <>
              <div>
                <Preview
                  value={chapter.description as string}
                />
              </div>
              {!!attachments.length && (
                <>
                  <Separator />
                  <div className='p-4'>
                    {attachments.map((attachment) => (
                      <a
                        href={attachment.url}
                        target='_blank'
                        key={attachment.id}
                        className='flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline'
                      >
                        <File />
                        <p className='line-clamp-1'>
                          {attachment.name}
                        </p>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChapterIdPage;
