import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";


const DashboardLayout = async({
    children
}:
{
    children: React.ReactNode;
}) => {
  const user = await currentUser();
  if(!user || user.role !== "ADMIN"){
return redirect("/")
  }
  return (
    <div>
        <main>
        {children}
        </main>
    </div>
  )
}

export default DashboardLayout