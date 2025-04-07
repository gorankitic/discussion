// utils
import { cn } from "@/lib/utils";
// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
    name: string,
    photoUrl?: string | undefined,
    size?: string,
    className?: string
}

const UserAvatar = ({ name, photoUrl, size = "size-6", className }: UserAvatarProps) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar className={cn("relative", size, className)} aria-label={`Avatar of ${name}`}>
                {photoUrl && (
                    <img src={photoUrl} className="object-cover w-full h-full" />
                )}
                {!photoUrl && (
                    <AvatarFallback>
                        {name?.charAt(0).toLocaleUpperCase()}
                    </AvatarFallback>
                )}
            </Avatar>
            <p className="text-sm font-medium">{name}</p>
        </div>
    )
}
export default UserAvatar;