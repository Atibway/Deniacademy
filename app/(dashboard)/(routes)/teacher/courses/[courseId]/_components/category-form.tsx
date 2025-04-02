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
import { Course } from "@prisma/client"
import { Combobox } from "@/components/ui/combobox"



const formSchema = z.object({
    categoryId: z.string().min(1),
    });

interface  CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: {label: string; value: string;}[]
}

export const CategoryForm = ({
    initialData,
    courseId,
    options
}: CategoryFormProps) => {
const [isEditing, setIsEditing] = useState(false)
const router = useRouter()
const toggleEdit = ()=> setIsEditing((current)=> !current)

const selectedOption = options.find((option)=> option.value === initialData.categoryId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      categoryId: initialData?.categoryId || ""
    },
      })

      const {isSubmitting, isValid} = form.formState;

      const onSubmit = async (values: z.infer< typeof formSchema>)=> {
try {
  await axios.patch(`/api/courses/${courseId}`, values);
  toast.success('Category updated');
  toggleEdit()
  router.refresh()
} catch (error) {
  toast.error("Something went wrong")
}



        }
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
<div className="font-medium flex items-center justify-between ">
  Course category
<Button onClick={toggleEdit} variant={"ghost"}>
  {isEditing && (
    <>
    Cancel
    </>
  )}

{!isEditing && !initialData.categoryId && (
  <>
  <PlusCircle className="h-4 w-4"/>
  Add category
  </>
)}
{!isEditing && initialData.categoryId && (
    <>
    <Pencil className="h-4 w-4 mr-2"/>
    Edit category
    </>
  )}
</Button>
</div>
{!isEditing && (
  <p className={cn(
    "text-sm mt-2",
    !initialData?.categoryId &&
    "text-slate-500"
  )}>
    {selectedOption?.label || "No category"}
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
  name="categoryId"
  render={({field}:any)=> (
    <FormItem>
<FormControl>
  <Combobox
  options={options}
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

{ !initialData.categoryId && (
  <>
  <p> Add category</p>
  
  </>
)}
{  initialData.categoryId && (
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
