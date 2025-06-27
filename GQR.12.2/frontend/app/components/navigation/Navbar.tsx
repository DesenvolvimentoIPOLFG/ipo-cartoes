import { BellIcon } from '@heroicons/react/24/outline'

interface NavbarProps {
  title: string
  notificationsOpen: boolean
  setNotificationsOpen: (open: boolean) => void
  showBackButton?: boolean
}

export default function Navbar({ title, notificationsOpen, setNotificationsOpen, showBackButton = true }: NavbarProps) {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          {showBackButton && (
            <button
              type="button"
              className="mr-4 inline-flex items-center justify-center rounded-full w-10 h-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={() => window.history.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          )}
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setNotificationsOpen(true)}
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="ml-6 border-l border-gray-200 dark:border-gray-700 pl-6">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full w-10 h-10 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              onClick={() => console.log('Logout clicked')}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="h-5 w-5"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}