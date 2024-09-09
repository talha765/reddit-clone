import './App.css';
import logo from './assets/reddit_logo.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function App() {
  return (
    <div>
      <header className="flex bg-gray-900 p-3"> {/* Adjust padding */}
        <div className="mx-4">
          <img src={logo} className="w-8 h-8 mt-1 mb-1" alt="Reddit logo" />
        </div>
        <form action="" className="relative flex items-center bg-gray-800 rounded-lg">
          <input 
            type="text" 
            className="bg-gray-800 h-8 text-white pl-8 pr-2 rounded-lg" // Added padding-left for icon space
            placeholder="Search" 
          />
          <MagnifyingGlassIcon className="absolute left-2 w-5 h-5 text-gray-400" /> {/* Positioned inside input */}
        </form>
      </header>
    </div>
  );
}

export default App;
