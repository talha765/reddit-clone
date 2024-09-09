import './App.css';
import logo from './assets/reddit_logo.png';
import { MagnifyingGlassIcon,BellIcon,ChatBubbleOvalLeftEllipsisIcon,PlusIcon } from '@heroicons/react/24/outline';

function App() {
  return (
    <div>
      <header className="flex bg-gray-900 p-2"> {/* Adjust padding */}
        <div className="mx-4">
          <img src={logo} className="w-8 h-8 mt-1 mb-1" alt="Reddit logo" />
        </div>
        <form action="" className="relative flex items-center bg-gray-600  rounded-lg">
          <input 
            type="text" 
            className="bg-gray-600 h-8 w-50 text-white pl-9 pr-2 rounded-lg" // Added padding-left for icon space
            placeholder="Search" 
          />
          <MagnifyingGlassIcon className="absolute left-2 w-5 h-5 text-white block focus:outline-none" /> {/* Positioned inside input */}
        </form>
        <BellIcon className='w-8 h-8 relative flex items-center mt-1 ml-5'/>
        <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8 relative flex items-center mt-1 ml-5"/>
        <PlusIcon  className='w-8 h-8 relative flex items-center mt-1 ml-5'/>
      </header>
    </div>
  );
}

export default App;
