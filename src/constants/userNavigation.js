import { FiGrid, FiDownload, FiUsers, FiHeart, FiSettings, FiDollarSign } from 'react-icons/fi';
import { MdOutlineGroups, MdOutlineAttachMoney } from 'react-icons/md';
import { FaRegHandshake } from 'react-icons/fa';
import { HiOutlineCog, HiOutlineLifebuoy } from 'react-icons/hi2';

// User dashboard navigation items
export const USER_NAVIGATION = [
  {
    title: 'داشبورد',
    path: '/panel',
    icon: <FiGrid />,
  },
  {
    title: 'دانلودها',
    path: '/panel/downloads',
    icon: <FiDownload />,
    badge: true, // Example: show badge
  },
  {
    title: 'همکاری در فروش',
    path: '/panel/affiliate',
    icon: <FaRegHandshake />,
  },
  {
    title: 'علاقه‌مندی',
    path: '/panel/favorites',
    icon: <FiHeart />,
  },
  {
    title: 'باشگاه مشتریان',
    path: '/panel/club',
    icon: <MdOutlineGroups />,
  },
  {
    title: 'مالی',
    path: '/panel/invoices',
    icon: <MdOutlineAttachMoney />,
  },
  {
    title: 'پشتیبانی',
    path: '/panel/support',
    icon: <FiUsers />,
    collapsible: true, // Example: collapsible group
  },
  {
    title: 'تنظیمات',
    path: '/panel/settings',
    icon: <FiSettings />,
    collapsible: true,
  },
  {
    title: 'توسعه دهنده شو',
    path: '/panel/become-developer',
    icon: <FiDollarSign />,
  },
];
export const dropdownItems = [
  {
    key: 'support',
    title: 'پشتیبانی',
    icon: <HiOutlineLifebuoy className="w-5 h-5 text-gray-600" />,
    children: [
      { title: 'تیکت جدید', href: '/panel/support/new' },
      { title: 'تیکت‌های من', href: '/panel/support/tickets' },
      { title: 'سوالات متداول', href: '/panel/support/faq' }
    ]
  },
  {
    key: 'settings',
    title: 'تنظیمات',
    icon: <HiOutlineCog className="w-5 h-5 text-gray-600" />,
    children: [
      { title: 'پروفایل', href: '/panel/settings/profile' },
      { title: 'تغییر رمز عبور', href: '/panel/settings/edit-profile/edit-password' },
      { title: 'اطلاعیه‌ها', href: '/panel/settings/notifications' }
    ]
  }
];