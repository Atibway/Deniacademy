import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "@/hooks/use-current-user"
import { LogoutButton } from "./logout-button"
import { LogInIcon, LogOutIcon} from "lucide-react"
import Link from "next/link"

  export const UserButton = () => {
    const user = useCurrentUser();

    if (!user) {
      // User is not logged in, display Login button
      return (
        <Link href="/auth/login">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
            <LogInIcon className="h-5 w-5" />
            <span>Login</span>
          </button>
        </Link>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image || ""}/>
                <AvatarFallback className="bg-sky-500">
                    <FaUser className="text-white"/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mr-2">
              {user?(
            <LogoutButton>
                <DropdownMenuItem>
                    <LogOutIcon className="h-4 w-4 mr-2"/>
                    Logout
                </DropdownMenuItem>
            </LogoutButton>
              ): (
                <Link
                href={"/auth/login"}
                >
                
                <DropdownMenuItem>
                        <LogInIcon className="h-4 w-4 mr-2"/>
                        Login
                    </DropdownMenuItem>
                </Link>
              )}
            {/* <Link
            href={"/settings"}
            >
            
            <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2"/>
                    Settings
                </DropdownMenuItem>
            </Link> */}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  