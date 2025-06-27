interface NotificationItemProps {
  id: number
  title: string
  description: string
  time: string
  status: string
}

export default function NotificationItem({ title, description, time, status }: NotificationItemProps) {
  return (
    <li className="py-5">
      <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          <span className="absolute inset-0" aria-hidden="true" />
          {title}
          {status === 'new' && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              Novo
            </span>
          )}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {time}
        </p>
      </div>
    </li>
  )
}