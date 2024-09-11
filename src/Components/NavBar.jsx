import logo from '../assets/logo.png';
import { MagnifyingGlassIcon, BellIcon, ChatBubbleOvalLeftEllipsisIcon, PlusIcon } from '@heroicons/react/24/outline';
import avatar from '../assets/avatar.png';

const NavBar = () => {
    return (
        <header className="fixed top-0 left-0 w-full flex items-center bg-gray-900 p-3 z-50"> 
            <div className="mx-4">
                <img src={logo} className="w-10 h-10 mr-20" alt="Logo" /> 
            </div>
            <form action="" className="relative flex items-center bg-gray-600 rounded-2xl flex-grow mx-4 ml-20 mr-20"> 
                <input 
                    type="text" 
                    className="bg-gray-600 h-10 w-full text-white pl-10 pr-3 rounded-2xl" 
                    placeholder="Search InventSpace" 
                />
                <MagnifyingGlassIcon className="absolute left-3 w-6 h-6 text-white" /> 
            </form>
            <button className="ml-10 mr-5 mx-2 bg-transparent focus:outline-none hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-900 p-2 rounded-full">
                <BellIcon className='w-7 h-7 text-white' /> 
            </button>
            <button className="mx-2 mr-5 bg-transparent focus:outline-none hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-900 p-2 rounded-full">
                <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7 text-white" /> 
            </button>
            <button className="mx-2 bg-transparent focus:outline-none hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-900 p-2 rounded-full">
                <PlusIcon className='w-7 h-7 text-white' /> 
            </button>
            <button className="mx-2 bg-gray-600 rounded-full p-1 mr-5 ml-20">
                <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" style={{ filter: 'invert(100%)' }} /> {/* Avatar image */}
            </button>
        </header>
    );
};

export default NavBar;
