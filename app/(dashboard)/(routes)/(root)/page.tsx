import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { getCourses } from "@/actions/get-courses"
import { CoursesList } from "@/components/courses-list"
import { Categories } from "./_components/Categories"
import WelcomeBanner from "./_components/Welcomebanner"

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string
  }
}

const SearchPage = async({
  searchParams
}:SearchPageProps) => {
  const user = await currentUser()
const userId = user?.id


  const categories = await db.category.findMany({
    orderBy:{
      name: "asc"
    }
  })

  const courses = await getCourses({
    userId,
    ...searchParams
  })

  return (
    <div className="">
     <div className="">
      <WelcomeBanner/>
    </div>
    <div className="p-6">
      <Categories
items={categories}
      />

      <CoursesList items={courses}/>
    </div>
    </div>
  )
}

export default SearchPage