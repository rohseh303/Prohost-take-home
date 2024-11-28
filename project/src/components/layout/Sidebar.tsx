import React from 'react';
import { NavLink } from './NavLink';
import { navigationItems } from '@/config/navigation';
import { Logo } from './Logo';

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <Logo />
      </div>
      
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-200 p-3">
        <NavLink item={{
          name: 'Help & support',
          href: '/support',
          icon: 'HelpCircle'
        }} />
      </div>
    </aside>
  );
}