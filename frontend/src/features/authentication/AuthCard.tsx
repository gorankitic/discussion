// lib
import { Link } from "react-router";
// icons
import { ArrowLeft } from "lucide-react";

type AuthCardProps = {
    children: React.ReactNode,
    title: string,
    backLinkHref?: string,
    label: string,
}

const AuthCard = ({ children, title, backLinkHref, label }: AuthCardProps) => {

    return (
        <div className="max-w-lg w-full mx-auto my-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="py-8 px-5">
                <h1 className="text-2xl my-5 font-bold text-center uppercase bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                    {title}
                </h1>
                {children}
            </div>
            <div className="px-8 py-3 text-sm bg-gray-400 flex justify-center">
                {backLinkHref ? (
                    <Link to={backLinkHref} className="flex items-center gap-1 hover:text-blue-600 hover:underline">
                        <ArrowLeft className="size-4 text-gray-700" />
                        <span>{label}</span>
                    </Link>
                ) : <span>{label}</span>}
            </div>
        </div>
    )
}

export default AuthCard;