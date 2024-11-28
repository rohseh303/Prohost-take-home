import React from 'react';
import { NavigationItem } from '@/types/navigation';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface NavLinkProps {
  item: NavigationItem;
}

export function NavLink({ item }: NavLinkProps) {
  const Icon = Icons[item.icon as keyof typeof Icons];
  const isActive = window.location.pathname === item.href;
  
  return (
    <a
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
        'hover:bg-gray-100',
        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{item.name}</span>
      {item.count && (
        <span className="ml-auto bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
          {item.count}
        </span>
      )}
    </a>
  );
}