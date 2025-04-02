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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateCourseSchema } from "@/schemas"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"



const CreateCoursePage = () => {

  const router = useRouter()

    const form = useForm<z.infer<typeof CreateCourseSchema>>({
        resolver: zodResolver(CreateCourseSchema),
        defaultValues:{
          title: ""
        }
          })

          const {isSubmitting, isValid} = form.formState;

         const onSubmit = async (values: z.infer< typeof CreateCourseSchema>)=> {
try {
  const response = await axios.post("/api/courses", values)

  router.push(`/teacher/courses/${response.data.id}`)
  toast.success("Course Created")
} catch (error) {
  toast.error("Something Went wrong")
  
}

         }
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 ">
<div>
  <h1 className="text-2xl">Name your course</h1>

  <p>
    What would you like to name your course? Don&apos;t worry, you change this later
  </p>

  <Form
  {...form}
  >
<form 
onSubmit={form.handleSubmit(onSubmit)}
className="space-y-8 mt-8"
>
  <FormField
  control={form.control}
  name="title"
  render={({field})=> (
    <FormItem>
<FormLabel>
  Course title
</FormLabel>
<FormControl>
  <Input
  disabled={isSubmitting}
  placeholder="e.g. 'Advanced web development'"
  {...field}
  />
</FormControl>
<FormDescription>
  What will you teach in this course?
</FormDescription>
<FormMessage/>
    </FormItem>
  )}

  />
  <div className="flex items-center gap-x-2">
<Link href={"/"}>
<Button
type="button"
variant={"destructive"}
>
  Cancel
</Button>
</Link>
<Button
type="submit"
disabled={!isValid || isSubmitting}
>
Continue
</Button>
  </div>
</form>
  </Form>
</div>
    </div>
  )
}

export default CreateCoursePage