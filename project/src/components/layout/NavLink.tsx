import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationItem } from '@/types/navigation';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface NavLinkProps {
  item: NavigationItem;
  isSelected?: boolean;
  onClick?: () => void;
}

export function NavLink({ item, isSelected, onClick }: NavLinkProps) {
  const Icon = Icons[item.icon as keyof typeof Icons];
  
  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
        isSelected 
          ? 'text-gray-900 bg-gray-200 hover:bg-gray-200' 
          : 'text-gray-700 hover:bg-gray-100'
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{item.name}</span>
      {item.count && (
        <span className="ml-auto bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
          {item.count}
        </span>
      )}
    </Link>
  );
}