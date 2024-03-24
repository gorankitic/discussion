// context
import { useCommentContext } from "../context/CommentContext";

const IconButton = ({ Icon, onClick }) => {
    const { disabled } = useCommentContext();

    return (
        <button onClick={onClick} disabled={disabled}>
            <Icon className="icon" />
        </button>
    )
}

export default IconButton;