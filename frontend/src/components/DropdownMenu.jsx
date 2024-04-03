// hooks
import { useLogout } from '../hooks/useLogout';
// context
import { useAuthContext } from '../hooks/useAuthContext';
// components
import { Link } from 'react-router-dom';
// assets
import { LogOut, User } from 'lucide-react';
// framer-motion
import { motion } from 'framer-motion';


const DropdownMenu = () => {
    const { user, isLoading } = useAuthContext();
    const { logout } = useLogout();

    return (
        <motion.div
            className='absolute right-0 text-sm mt-1 bg-neutral-50 border border-neutral-300 rounded-sm w-60 overflow-hidden'
            animate={{ scale: [0, 1] }}
            transition={{ times: [0, 0.3] }}
        >
            <Link to="/profile" className='flex items-center gap-1 px-4 py-2 hover:bg-neutral-200 opacity-75'>
                <User className='w-4 h-4' />
                Profile
            </Link>
            <span className='absolute border-t border-neutral-300 w-full'></span>
            <button
                className='flex items-center gap-1 px-4 py-2 hover:bg-neutral-200 w-full text-red-500'
                disabled={isLoading}
                onClick={logout}
            >
                <p>{user.name}</p>
                <p className='font-semibold ml-auto'>Sign out</p>
                <LogOut className='w-4 h-4' />
            </button>
        </motion.div>
    )
}

export default DropdownMenu;