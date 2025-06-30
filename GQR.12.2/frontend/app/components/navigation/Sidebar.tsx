import { ChartBarIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface SubNavigationItem {
  name: string
  href: string
  current: boolean
}

interface NavigationItem {
  name: string
  href: string
  icon: any
  current: boolean
  subItems?: SubNavigationItem[]
}

interface SidebarProps {
  navigation: NavigationItem[]
}

export default function Sidebar({ navigation }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Auto-expand items that have current sub-items
  useEffect(() => {
    const itemsToExpand = navigation
      .filter(item => item.subItems?.some(subItem => subItem.current))
      .map(item => item.name)
    setExpandedItems(itemsToExpand)
  }, [navigation])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          <img className="h-16 w-auto" src="/logos/IPOv2_1.png" alt="IPO Lisboa" />
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const isExpanded = expandedItems.includes(item.name)
              const hasSubItems = item.subItems && item.subItems.length > 0
              
              return (
                <div key={item.name}>
                  <div className="flex items-center">
                    <a
                      href={item.href}
                      className={`group flex items-center flex-1 px-2 py-2 text-sm font-medium rounded-md ${
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
                    {hasSubItems && (
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      >
                        {isExpanded ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  {hasSubItems && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems!.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className={`group flex items-center px-2 py-1 text-sm rounded-md ${
                            subItem.current
                              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                              : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 flex-shrink-0"></span>
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}