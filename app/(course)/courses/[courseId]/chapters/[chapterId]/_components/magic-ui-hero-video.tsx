import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { Chapter } from '@prisma/client';
import React from 'react'

type Props = {
    courseId: string;
      chapterId: string;
      nextChapterId?: string;
      isLocked: boolean;
      completedOnEnd: boolean;
      title: string;
      chapter: Chapter;
      courseImage: string
}

export const MagicUIvideo = ({
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  chapter,
  courseImage
}: Props) => {
  return (
    <div className="relative">
    <HeroVideoDialog
      className="block dark:hidden"
      animationStyle="top-in-bottom-out"
      thumbnailSrc={courseImage}
      thumbnailAlt="Hero Video"
      chapterId={chapterId}
      title={chapter.title}
      courseId={courseId}
      nextChapterId={nextChapterId}
      isLocked={isLocked}
      chapter={chapter}
    />
    <HeroVideoDialog
      className="hidden dark:block"
      animationStyle="top-in-bottom-out"
      thumbnailSrc={courseImage}
      thumbnailAlt="Hero Video"
      chapterId={chapterId}
      title={chapter.title}
      courseId={courseId}
      nextChapterId={nextChapterId}
      isLocked={isLocked}
      chapter={chapter}
    />
  </div>
  )
}



{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/QFaFIcGhPoM?si=fXKFV05nZZkd-CLg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

