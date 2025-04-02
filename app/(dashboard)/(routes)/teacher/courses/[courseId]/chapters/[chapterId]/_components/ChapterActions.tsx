
"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
};

export const ChapterActions = ({
disabled,
courseId,
chapterId,
isPublished
}:ChapterActionsProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

const onClick= async ()=> {

    try {
        setIsLoading(true);
        if(isPublished) {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublished`);
            toast.success("Chapter unpublished")
            router.refresh();
        }else {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/published`);
            toast.success("Chapter published") 
            router.refresh();

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
        await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
        toast.success("Chapter Deleted")
        router.push(`/teacher/courses/${courseId}`)
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
