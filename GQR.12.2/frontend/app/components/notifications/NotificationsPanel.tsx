import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon as XIcon } from '@heroicons/react/24/outline'
import NotificationItem from './NotificationItem'

interface Notification {
  id: number
  title: string
  description: string
  time: string
  status: string
}

interface NotificationsPanelProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  notifications: Notification[]
}

export default function NotificationsPanel({ isOpen, setIsOpen, notifications }: NotificationsPanelProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setIsOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 shadow-xl">
                  <div className="p-6 pr-2">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                        Notificações
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="bg-gray-100 dark:bg-gray-700 rounded-full p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="sr-only">Fechar painel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 flow-root">
                      <ul role="list" className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                        {notifications.map((notification) => (
                          <NotificationItem key={notification.id} {...notification} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}