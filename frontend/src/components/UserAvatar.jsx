
const UserAvatar = ({ photoUrl, name }) => {
    return (
        <div className="flex items-center">
            <img src={photoUrl} alt="user avatar" className="w-6 h-6 object-cover rounded-full" />
            <p className="font-medium ml-2">{name}</p>
        </div>
    )
}

export default UserAvatar;