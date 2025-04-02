"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import { Loader2, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Chapter, Course } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { ChaptersList } from "./chapters-list"



const formSchema = z.object({
    title: z.string().min(1),
    });

interface  ChaptersFormProps {
    initialData: Course & {chapter: Chapter[]}
    courseId: string;
}

export const ChaptersForm = ({
    initialData,
    courseId
}: ChaptersFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
const [isCreating, setIsCreating] = useState(false)
const [isUpdating, setIsUpdating] = useState(false)
const router = useRouter()
const toggleCreating = ()=> setIsCreating((current)=> !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      title: ""
    },
      })

      const {isSubmitting, isValid} = form.formState;

      const onSubmit = async (values: z.infer< typeof formSchema>)=> {
try {
  setIsLoading(true)
  await axios.post(`/api/courses/${courseId}/chapters`, values);
  toast.success('Chapter Created');
  toggleCreating()
  window.location.reload()
} catch (error) {
  toast.error("Something went wrong")
} finally{
  router.refresh()
}


}

const onReorder =  async(updateData: {id: string; position: number}[])=> {
try {
  setIsUpdating(true)

  await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
    list: updateData
  });
  toast.success("Chapters reordered")
  router.refresh()
} catch (error) {
  toast.error("Something went wrong")
} finally{
  setIsUpdating(false)
}
}

const onEdit = (id:string)=> {
  router.push(`/teacher/courses/${courseId}/chapters/${id}`)
}
if (isLoading) {
  router.refresh()
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}
  
  return (
    <div className="relative mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-sky-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700"/>
        </div>
      )}
<div className="font-medium flex items-center justify-between ">
  Course chapters
<Button onClick={toggleCreating} variant={"ghost"}>
  {isCreating ? (
    <>
    Cancel
    </>
  ): (
    <>
    <PlusCircle className="h-4 w-4 mr-2"/>
    Add Chapter
    </>
  )}

</Button>
</div>
{isCreating && (
  <Form
  {...form}
  >
<form 
onSubmit={form.handleSubmit(onSubmit)}
className="space-y-4 mt-4"
>
  <FormField
  control={form.control}
  name="title"
  render={({field})=> (
    <FormItem>
<FormControl>
  <Input
  disabled={isSubmitting}
  placeholder="e.g. 'Introduction to the course'"
  {...field}
  />
</FormControl>
<FormMessage/>
    </FormItem>
  )}

  />
  
<Button
type="submit"
disabled={!isValid || isSubmitting}
>
Create
</Button>

</form>
  </Form>
)}

{!isCreating && (
  <div className={cn(
    "text-sm mt-2",
    !initialData.chapter.length && "text-slate-500 italic"
  )}>
   {!initialData.chapter.length &&  " No Chapters"}

   <ChaptersList
  onEdit={onEdit}
  onReorder={onReorder}
  items={initialData.chapter || []}
   />
  </div>
)}
{!isCreating && (
  <p className="text-xs text-muted-foreground mt-4">
    Drag and drop to reorder the chapters
  </p>
)}
    </div>
  )
}
