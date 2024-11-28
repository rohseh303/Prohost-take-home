import React from 'react';
import { Menu, Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <h1 className="text-xl text-gray-800">Calendar</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full border-2 border-gray-300" aria-label="Notifications">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center rounded-full border-2 border-gray-300">
            <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Menu">
                <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-8 h-8 rounded-full bg-blue-200 text-purple-800 flex items-center justify-center m-1">
                <span className="text-lg font-medium">B</span>
            </button>
        </div>
      </div>
    </header>
  );
};