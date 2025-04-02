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
import { Pencil, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Chapter } from "@prisma/client"
import { Editor } from "@/components/editor"
import { Preview } from "@/components/preview"



const formSchema = z.object({
    description: z.string().min(1),
    });

interface  ChapterDescriptionFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string
}

export const ChapterDescriptionForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterDescriptionFormProps) => {
const [isEditing, setIsEditing] = useState(false)
const router = useRouter()
const toggleEdit = ()=> setIsEditing((current)=> !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      description: initialData?.description || ""
    },
      })

      const {isSubmitting, isValid} = form.formState;

      const onSubmit = async (values: z.infer< typeof formSchema>)=> {
try {
  await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
  toast.success('Chapter Description updated');
  toggleEdit()
  router.refresh()
} catch (error) {
  toast.error("Something went wrong")
}

        }
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
<div className="font-medium flex items-center justify-between ">
  Course description
<Button onClick={toggleEdit} variant={"ghost"}>
  {isEditing && (
    <>
    Cancel
    </>
  )}

{!isEditing && !initialData.description && (
  <>
  <PlusCircle className="h-4 w-4"/>
  Add Description
  </>
)}
{!isEditing && initialData.description && (
    <>
    <Pencil className="h-4 w-4 mr-2"/>
    Edit description
    </>
  )}
</Button>
</div>
{!isEditing && (
  <div className={cn(
    "text-sm mt-2",
    !initialData?.description &&
    "text-slate-500"
  )}>
    {!initialData?.description && "No description"}
    {initialData?.description && (
      <Preview
value={initialData?.description}
      />
    )}
  </div>
)}
{isEditing && (
  <Form
  {...form}
  >
<form 
onSubmit={form.handleSubmit(onSubmit)}
className="space-y-4 mt-4"
>
  <FormField
  control={form.control}
  name="description"
  render={({field})=> (
    <FormItem>
<FormControl>
  <Editor
  {...field}
  />
</FormControl>
<FormMessage/>
    </FormItem>
  )}

  />
  <div className="flex items-center gap-x-2">

<Button
type="submit"
disabled={!isValid || isSubmitting}
>

{ !initialData.description && (
  <>
  <p> Add Description</p>
  
  </>
)}
{  initialData.description && (
    <>
    Save
    </>
  )}
</Button>
  </div>
</form>
  </Form>
)}
    </div>
  )
}
