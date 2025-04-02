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
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/format"



const formSchema = z.object({
    price: z.coerce.number()
    });

interface  priceFormProps {
    initialData: Course;
    courseId: string;
}

export const PriceForm = ({
    initialData,
    courseId
}: priceFormProps) => {
const [isEditing, setIsEditing] = useState(false)
const router = useRouter()
const toggleEdit = ()=> setIsEditing((current)=> !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      price: initialData?.price || undefined
    },
      })

      const {isSubmitting, isValid} = form.formState;

      const onSubmit = async (values: z.infer< typeof formSchema>)=> {
try {
  await axios.patch(`/api/courses/${courseId}`, values);
  toast.success('price updated');
  toggleEdit()
  router.refresh()
} catch (error) {
  toast.error("Something went wrong")
}

        }
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
<div className="font-medium flex items-center justify-between ">
  Course price
<Button onClick={toggleEdit} variant={"ghost"}>
  {isEditing && (
    <>
    Cancel
    </>
  )}

{!isEditing && !initialData.price && (
  <>
  <PlusCircle className="h-4 w-4"/>
  Add price
  </>
)}
{!isEditing && initialData.price && (
    <>
    <Pencil className="h-4 w-4 mr-2"/>
    Edit price
    </>
  )}
</Button>
</div>
{!isEditing && (
  <p className={cn(
    "text-sm mt-2",
    !initialData?.price &&
    "text-slate-500"
  )}>
    {initialData.price 
    ? formatPrice(initialData.price) 
    : "No price" 
  }
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
  name="price"
  render={({field})=> (
    <FormItem>
<FormControl>
  <Input
  type="number"
  step={"0.01"}
  disabled={isSubmitting}
  placeholder="Set a price for your course'"
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

{ !initialData.price && (
  <>
  <p> Add price</p>
  
  </>
)}
{  initialData.price && (
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
