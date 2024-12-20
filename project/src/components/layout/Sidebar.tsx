import React, { useState } from 'react';
import { NavLink } from './NavLink';
import { navigationItems } from '@/config/navigation';
import logo from '../assets/logo.jpeg';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [selectedItem, setSelectedItem] = useState<string>(window.location.pathname);

  return (
    <div className={`bg-gray-200 ${className}`}>
      <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Custom Logo" className="w-8 h-8" />
            <span className="font-semibold text-xl">ProhostAI</span>
          </div>
        </div>
        
        <nav className="flex-1 px-3 py-2 flex flex-col">
          <ul className="space-y-1 flex-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <NavLink 
                  item={item} 
                  isSelected={selectedItem === item.href}
                  onClick={() => setSelectedItem(item.href)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-3">
          <NavLink 
            item={{
              name: 'Help & support',
              href: '/support',
              icon: 'HelpCircle'
            }}
            isSelected={selectedItem === '/support'}
            onClick={() => setSelectedItem('/support')}
          />
        </div>
      </aside>
    </div>
  );
};