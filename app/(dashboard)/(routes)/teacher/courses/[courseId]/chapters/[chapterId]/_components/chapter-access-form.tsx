"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

  FormDescription,

  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { Chapter } from "@prisma/client"
import { Checkbox } from "@/components/ui/checkbox"


const formSchema = z.object({
    isFree: z.boolean().default(false)
    });

interface  ChapterAccessFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string
}

export const ChapterAccessForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterAccessFormProps) => {
const [isEditing, setIsEditing] = useState(false)
const router = useRouter()
const toggleEdit = ()=> setIsEditing((current)=> !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      isFree: Boolean(initialData?.isFree)
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
  Chapter access Settings
<Button onClick={toggleEdit} variant={"ghost"}>
  {isEditing? (
    <>
    Cancel
    </>
  ):(
    <>
    <Pencil className="h-4 w-4 mr-2"/>
    Edit Access
    </>
  )
  }

</Button>
</div>
{!isEditing && (
  <div className={cn(
    "text-sm mt-2",
    !initialData?.isFree &&
    "text-slate-500 dark:text-slate-400"
  )}>
    {initialData?.isFree? (
      <>
      This chapter is free for preview.
      </>
    ): (
      <>
      This chapter is not free
      </>
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
  name="isFree"
  render={({field})=> (
    <FormItem className="flex flex-row items-start 
    space-x-3 space-y-0 rounded-md border p-4">
<FormControl>
  <Checkbox
checked={field.value}
onCheckedChange={field.onChange}
  />

</FormControl>
<div className="space-y-1 leading-none">
<FormDescription>
  Check this box if you ant to make this chapter free for preview
</FormDescription>
</div>
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
