import React from 'react';
import { 
  RiUserLine, 
  RiShoppingBagLine, 
  RiShoppingCartLine, 
  RiMoneyDollarCircleLine,
  RiArrowUpLine,
  RiArrowDownLine
} from 'react-icons/ri';
import { cn } from '../../utils/cssUtils';

/**
 * Dashboard Component
 * Main admin panel page with statistics and charts
 */
const Dashboard = () => {
  // Sample data for statistic cards
  const statsData = [
    {
      id: 'users',
      title: 'کل کاربران',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
      icon: RiUserLine,
      color: 'blue'
    },
    {
      id: 'products',
      title: 'محصولات',
      value: '856',
      change: '+3%',
      changeType: 'increase',
      icon: RiShoppingBagLine,
      color: 'green'
    },
    {
      id: 'orders',
      title: 'سفارشات',
      value: '432',
      change: '-2%',
      changeType: 'decrease',
      icon: RiShoppingCartLine,
      color: 'orange'
    },
    {
      id: 'revenue',
      title: 'درآمد',
      value: '۲,۵۴۳,۰۰۰ تومان',
      change: '+8%',
      changeType: 'increase',
      icon: RiMoneyDollarCircleLine,
      color: 'purple'
    }
  ];

  /**
   * Render a statistics card
   */
  const StatCard = ({ stat }) => {
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500'
    };

    const IconComponent = stat.icon;

    return (
      <div className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        "dark:border-gray-700 dark:bg-gray-800"
      )}>
        <div className="flex items-center justify-between">
          <div>
            {/* Card title */}
            <p className={cn(
              "text-sm font-medium text-gray-600 transition-colors",
              "dark:text-gray-400"
            )}>
              {stat.title}
            </p>
            {/* Card value */}
            <p className={cn(
              "mt-2 text-3xl font-bold text-gray-900 transition-colors",
              "dark:text-gray-100"
            )}>
              {stat.value}
            </p>
            {/* Change percentage */}
            <div className="mt-2 flex items-center gap-2">
              {stat.changeType === 'increase' ? (
                <RiArrowUpLine className="h-4 w-4 text-green-500" />
              ) : (
                <RiArrowDownLine className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                "text-sm font-medium",
                stat.changeType === 'increase' ? "text-green-600" : "text-red-600"
              )}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                از ماه قبل
              </span>
            </div>
          </div>
          {/* Icon container */}
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg",
            colorClasses[stat.color]
          )}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className={cn(
          "text-2xl font-bold text-gray-900 transition-colors",
          "dark:text-gray-100"
        )}>
          داشبورد
        </h1>
        <p className={cn(
          "mt-1 text-sm text-gray-600 transition-colors",
          "dark:text-gray-400"
        )}>
          خلاصه‌ای از عملکرد سیستم شما
        </p>
      </div>

      {/* Statistics cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Charts and tables section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sample card 1 */}
        <div className={cn(
          "rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
          "dark:border-gray-700 dark:bg-gray-800"
        )}>
          <h3 className={cn(
            "text-lg font-semibold text-gray-900 transition-colors",
            "dark:text-gray-100"
          )}>
            فروش هفتگی
          </h3>
          <div className={cn(
            "mt-4 flex h-48 items-center justify-center rounded-lg bg-gray-50",
            "dark:bg-gray-700"
          )}>
            <p className={cn(
              "text-gray-500 transition-colors",
              "dark:text-gray-400"
            )}>
              نمودار فروش اینجا قرار می‌گیرد
            </p>
          </div>
        </div>

        {/* Sample card 2 */}
        <div className={cn(
          "rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
          "dark:border-gray-700 dark:bg-gray-800"
        )}>
          <h3 className={cn(
            "text-lg font-semibold text-gray-900 transition-colors",
            "dark:text-gray-100"
          )}>
            آخرین فعالیت‌ها
          </h3>
          <div className="mt-4 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <p className={cn(
                  "text-sm text-gray-600 transition-colors",
                  "dark:text-gray-400"
                )}>
                  فعالیت نمونه شماره {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
