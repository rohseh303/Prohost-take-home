import { NavigationItem } from '@/types/navigation';

export const navigationItems: NavigationItem[] = [
  {
    name: 'Inbox',
    href: '/inbox',
    icon: 'Inbox'
  },
  {
    name: 'Calendar',
    href: '/calendar',
    icon: 'Calendar'
  },
  {
    name: 'Tasks',
    href: '/tasks',
    icon: 'CheckSquare',
    count: 1
  },
  {
    name: 'Upsells',
    href: '/upsells',
    icon: 'TrendingUp'
  },
  {
    name: 'Listings',
    href: '/listings',
    icon: 'List'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: 'Settings'
  }
];