import Tooltip from './Tootips.jsx';
import Dropdown from './Dropdown';
import { useState } from 'react';

export default function Header({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">FashionHub</h1>
        <Dropdown />
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-4">
            <a href="#" className="hover:text-blue-500">Home</a>
            <a href="#" className="hover:text-blue-500">Shop</a>
          </nav>
          
          {/* Add search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-1 border rounded-full text-sm"
            />
            <button 
              onClick={() => console.log('Search:', searchQuery)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              🔍
            </button>
          </div>
          
          {children}
        </div>
      </div>
      <div className="mt-4">
        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
      </div>
    </header>
  );
}