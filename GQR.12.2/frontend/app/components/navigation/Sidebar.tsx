import { ChartBarIcon } from '@heroicons/react/24/outline'

interface NavigationItem {
  name: string
  href: string
  icon: any
  current: boolean
}

interface SidebarProps {
  navigation: NavigationItem[]
}

export default function Sidebar({ navigation }: SidebarProps) {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          <img className="h-16 w-auto" src="/logos/IPOv2_1.png" alt="IPO Lisboa" />
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    item.current
                      ? 'text-gray-500 dark:text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}