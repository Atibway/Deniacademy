"use client"

import { Category } from "@prisma/client"
import {
FcMusic,
FcFilmReel,
FcEngineering,
FcMultipleDevices,
FcOldTimeCamera,
FcSalesPerformance,
FcSportsMode,

} from "react-icons/fc"
import { IconType } from "react-icons/lib"
import CategoryItem from "./category-item"
import { FaMicroscope } from "react-icons/fa";

interface CategoriesProps {
    items: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Programming": FcMultipleDevices,
    "Filming": FcFilmReel,
    "Engineering": FcEngineering,
    "Science": FaMicroscope,
}
export const Categories = ({
items
}:CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pd-2">
{items.map((item)=> (
    <CategoryItem
   key={item.id}
   label={item.name}
   icon= {iconMap[item.name]}
   value={item.id}
    />
))}
    </div>
  )
}
