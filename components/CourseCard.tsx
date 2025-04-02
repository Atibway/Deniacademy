"use client"

import Image from "next/image";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import CourseProgress from "@/app/(course)/courses/[courseId]/_components/CourseProgress";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/hooks/use-login";
import { useCurrentUser } from "@/hooks/use-current-user";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

const CourseCard = ({
id,
title,
imageUrl,
chaptersLength,
price,
progress,
category
}: CourseCardProps) => {
const router = useRouter()
const loginModal = useLoginModal()
const user = useCurrentUser()

const onClick = ()=>{
if(user){
  router.push(`/courses/${id}`)
}else {
  loginModal.onOpen()
}
}


  return (
    <div
    className="cursor-pointer"
    onClick={onClick}
    >
    <div className="group mt-2 hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
<div
className="relative w-full aspect-video rounded-md overflow-hidden"
>
<Image
fill
className="object-cover"
alt={title}
src={imageUrl}
/>
</div>
<div className="text flex-col pt-2">
  <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
    {title}
  </div>
  <p className="text-xs text-muted-foreground">
    {category}
  </p>
  <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
    <div className="flex items-center gap-x-1 text-slate-500">
      <IconBadge
      size={"sm"}
      icon={BookOpen}
      />
      <div>
        {chaptersLength} {chaptersLength === 1 ? "Chapter": "Chapters"}
      </div>
    </div>
  </div>
  {progress !== null && user ? (
    <CourseProgress
variant={progress === 100? "success": "default"}
size="sm"
value={progress}
    />
  ): (
    <p className="text-md md:text-sm font-medium text-slate-700">
      {price ? (
              formatPrice(price)
            ) : "Free"
            }
    </p>
  )}
</div>
    </div>
    </div>
  )
}

export default CourseCard