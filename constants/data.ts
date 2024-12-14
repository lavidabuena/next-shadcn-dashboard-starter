import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard', // アイコン例: ダッシュボード
    isActive: false,
    items: []
  },
  {
    title: 'Employee',
    url: '/dashboard/employee',
    icon: 'user', // アイコン例: ユーザー管理
    isActive: false,
    items: []
  },
  {
    title: 'Product Management',
    url: '#', // 親項目にはリンクなし
    icon: 'box', // アイコン例: 商品管理グループ
    isActive: false,
    items: [
      {
        title: 'Menu',
        url: '/dashboard/menu',
        icon: 'menu' // アイコン例: メニュー管理
      },
      {
        title: 'Option',
        url: '/dashboard/option',
        icon: 'settings' // アイコン例: 設定
      },
      {
        title: 'Category & Tag',
        url: '/dashboard/categorytag',
        icon: 'tags' // アイコン例: タグ管理
      },
      {
        title: 'product',
        url: '/dashboard/product',
        icon: 'tags' // アイコン例: タグ管理
      }
    ]
  },
  {
    title: 'Reservation Settings',
    url: '/dashboard/reservation-settings',
    icon: 'calendar', // アイコン例: 予約設定
    isActive: false,
    items: []
  },
  {
    title: 'Account',
    url: '#',
    icon: 'billing', // アイコン例: アカウント
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen' // アイコン例: プロフィール編集
      },
      {
        title: 'Login',
        url: '/',
        icon: 'login' // アイコン例: ログイン
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban', // アイコン例: カンバン
    isActive: false,
    items: []
  }
];
