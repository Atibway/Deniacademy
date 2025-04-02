"use client"

import * as z from "zod"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import { Pencil, PlusCircle, VideoIcon } from "lucide-react"
import { Chapter} from "@prisma/client"

import { FileUpload } from "@/components/file-upload"

import 'video.js/dist/video-js.css';



const formSchema = z.object({
    videoUrl: z.string().min(1),
    });

interface  ChapterVideoFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId:string;
   
}

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId,
    
}: ChapterVideoFormProps) => {
const [isEditing, setIsEditing] = useState(false)
const router = useRouter()
const toggleEdit = ()=> setIsEditing((current)=> !current)

      const onSubmit = async (values: z.infer< typeof formSchema>)=> {
try {
  await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
  toast.success('Chapter updated');
  toggleEdit()
  router.refresh()
} catch (error) {
  toast.error("Something went wrong")
}

        }
        
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
<div className="font-medium flex items-center justify-between ">
  Chapter Video
<Button onClick={toggleEdit} variant={"ghost"}>
  {isEditing && (
    <>
    Cancel
    </>
  )}
  {!isEditing && !initialData.videoUrl && (
    <>
    <PlusCircle className="h-4 w-4 mr-2"/>
    Add an Video
    </>
  )}
  {!isEditing && initialData.videoUrl && (
    <>
    <Pencil className="h-4 w-4 mr-2"/>
    Edit Video
    </>
  )
  }
</Button>
</div>

{!isEditing && (
  !initialData.videoUrl? (
<div className="flex items-center justify-center h-60 bg-sky-200 rounded-md">
  <VideoIcon className="h-10 w-10 text-sky-500"/>
</div>
  ): (
    <div className="relative aspect-video mt-2">
{/* <MuxPlayer
playbackId={initialData?.muxData?.playbackId || ""}
/> */}
<video
    id="my-player"
    className="video-js"
    controls
    // autoPlay={true}
    // loop={true}
    // muted={true}
    preload="auto"
    
    data-setup='{}'>
  <source src={initialData.videoUrl} type="video/mp4"></source>
</video>
    </div>
  )
)}
{isEditing && (
  <div>

  <FileUpload
  endpoint="chapterVideo"
  onChange={(url)=> {
    if(url){
      onSubmit({videoUrl: url})
    }
  }}
  />

  <div className="text-xs text-muted-foreground mt-4">
    Upload this chapter&apos;s video
  </div>
  </div>
)}
{initialData.videoUrl && !isEditing && (
  <div className=" text-muted-foreground mt-2">
    {initialData.title}
  </div>
)}
    </div>
  )
}
