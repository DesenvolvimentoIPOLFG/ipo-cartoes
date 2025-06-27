'use client';

export default function Navigation() {
  const menuItems = [
    { href: '/pages/ipo/dashboard', label: 'Dashboard IPO', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { href: '/pages/rh/dashboard', label: 'Dashboard RH', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { href: '/pages/rs/dashboard', label: 'Dashboard RS', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {menuItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-4"
        >
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
          </svg>
          <span className="text-lg font-medium text-gray-900">{item.label}</span>
        </a>
      ))}
    </div>
  )
}