// lib
import { useNavigate } from "react-router";
// hooks
import { useUser } from "@/features/authentication/useUser";
import { useLogout } from "@/features/authentication/useLogout";
// components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// icons
import { LogOut, Settings } from "lucide-react";

const UserButton = () => {
    const { user } = useUser();
    const { signOut } = useLogout();
    const navigate = useNavigate();

    if (!user) return;

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <Avatar className="relative size-7 md:size-8" aria-label={`Avatar of ${user.name}`}>
                    {/* {user.photoUrl && (
                        
                    )} */}
                    {!user.photoUrl && (
                        <AvatarFallback>
                            {user.name?.charAt(0).toLocaleUpperCase()}
                        </AvatarFallback>
                    )}
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 px-5 py-3" align="end">
                <div className="mb-2 flex items-center gap-3">
                    {user.photoUrl && (
                        <img
                            src={user.photoUrl}
                            alt={user.name!}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    )}
                    <div className="">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="group cursor-pointer transition-all duration-300" onClick={() => navigate("/settings")}>
                    <Settings className="text-gray-700 group-hover:rotate-180 transition-all duration-500 ease-in-out" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="group cursor-pointer transition-all duration-300"
                    onClick={() => signOut()}
                >
                    <LogOut className="text-gray-700 group-hover:translate-x-1 transition-all duration-500 ease-in-out" />
                    <span >Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UserButton;