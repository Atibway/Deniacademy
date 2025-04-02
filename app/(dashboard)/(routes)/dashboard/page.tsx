

import { getDashboardCourses } from "@/actions/get-dashboard-courses"
import { CoursesList } from "@/components/courses-list"
import { currentUser } from "@/lib/auth"
import { CheckCircle, Clock } from "lucide-react"
import { redirect } from "next/navigation"
import InfoCard from "./_components/InfoCard"

const HomePage = async() => {
  const user = await  currentUser()

  if(!user?.id){
return redirect("/auth/login")
  }


  const {
    completedCourses,
    courseInProgress
  } = await getDashboardCourses(user.id);


  return (
<div className="p-6 space-y-4 ">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
<InfoCard
icon={Clock}
label="In Progress"
numberOfItems = {courseInProgress?.length}
/>
<InfoCard
icon={CheckCircle}
label="Completed"
numberOfItems = {completedCourses?.length}
variant="success"
/>

 </div>

 <CoursesList
items={[...courseInProgress, ...completedCourses]}
 />
</div>
  )
}

export default HomePage





