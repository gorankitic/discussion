// context
import { useCommentContext } from "../hooks/useCommentContext";

const IconButton = ({ Icon, onClick }) => {
    const { disabled } = useCommentContext();

    return (
        <button onClick={onClick} disabled={disabled}>
            <Icon className="icon" />
        </button>
    )
}

export default IconButton;