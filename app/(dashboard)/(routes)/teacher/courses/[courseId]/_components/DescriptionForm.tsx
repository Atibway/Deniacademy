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
import { Textarea } from "@/components/ui/textarea"
import { Course } from "@prisma/client"



const formSchema = z.object({
    description: z.string().min(1, {
        message: "description is required"
    }),
    });

interface  DescriptionFormProps {
    initialData: Course;
    courseId: string;
}

export const DescriptionForm = ({
    initialData,
    courseId
}: DescriptionFormProps) => {
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
  await axios.patch(`/api/courses/${courseId}`, values);
  toast.success('Description updated');
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
  <p className={cn(
    "text-sm mt-2",
    !initialData?.description &&
    "text-slate-500"
  )}>
    {initialData?.description || "No description"}
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
  name="description"
  render={({field})=> (
    <FormItem>
<FormControl>
  <Textarea
  disabled={isSubmitting}
  placeholder="e.g. 'This course is about...'"
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
