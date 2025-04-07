const NotificationsBadge = ({ count }: { count: number }) => {
    if (!count || count <= 0) return null;

    return (
        <>
            <span className="absolute size-[18px] rounded-full bg-blue-400 opacity-75 animate-ping" />
            <span className="absolute size-[18px] rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">
                {count}
            </span>
        </>
    )
}

export default NotificationsBadge;