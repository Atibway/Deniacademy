
"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
};

export const Actions = ({
disabled,
courseId,
isPublished
}:ActionsProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const confetti = useConfettiStore()
const onClick= async ()=> {

    try {
        setIsLoading(true);
        if(isPublished) {
            await axios.patch(`/api/courses/${courseId}/unpublished`);
            toast.success("Course unpublished")
            router.refresh();
        }else {
            await axios.patch(`/api/courses/${courseId}/published`);
            toast.success("Course published") 
            router.refresh();
            confetti.onOpen();

        }
    } catch (error) {
    toast.error("Something went wrong")    
    } finally {
        setIsLoading(false)
    }
}

const onDelete = async ()=> {

    try {
        setIsLoading(true);
        await axios.delete(`/api/courses/${courseId}`);
        toast.success("Course Deleted")
        router.push(`/teacher/courses`)
        router.refresh();
    } catch (error) {
    toast.error("Something went wrong")    
    } finally {
        setIsLoading(false)
    }
}
  return (
    <div className="flex items-center gap-x-2">
        <Button
        onClick={onClick}
        disabled={disabled}
        variant={"outline"}
        size={"sm"}
        >
{isPublished? "Unpublished" : "Published"}
        </Button>
<ConfirmModal onConfirm={onDelete}>

        <Button 
        disabled={isLoading}
        size={"sm"}
        variant={"destructive"}
        >
<Trash className="h-4 w-4"/>
        </Button>
</ConfirmModal>
        </div>
  )
}
