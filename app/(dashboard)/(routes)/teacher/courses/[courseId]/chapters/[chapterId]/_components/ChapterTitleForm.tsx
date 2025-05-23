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
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import { Pencil } from "lucide-react"



const formSchema = z.object({
    title: z.string().min(1),
    });

interface  ChapterTitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
    chapterId: string
}

export const ChapterTitleForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterTitleFormProps) => {
const [isEditing, setIsEditing] = useState(false)
const router = useRouter()
const toggleEdit = ()=> setIsEditing((current)=> !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:initialData,
      })

      const {isSubmitting, isValid} = form.formState;

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
  Chapter Title
<Button onClick={toggleEdit} variant={"ghost"}>
  {isEditing? (
    <>
    Cancel
    </>
  ):
  (
    <>
    <Pencil className="h-4 w-4 mr-2"/>
    Edit title
    </>
  )}
</Button>
</div>
{!isEditing && (
  <p className="text-sm mt-2">
    {initialData.title}
  </p>
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
  name="title"
  render={({field})=> (
    <FormItem>
<FormControl>
  <Input
  disabled={isSubmitting}
  placeholder="e.g. 'Introduction To The Course'"
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
Save
</Button>
  </div>
</form>
  </Form>
)}
    </div>
  )
}
