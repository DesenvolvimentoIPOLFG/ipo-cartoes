import {
  ChartBarIcon,
  CreditCardIcon,
  DocumentCheckIcon,
  CogIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

export const navigationConfig = {
  rh: [
    { name: 'Dashboard', href: '/pages/rh/dashboard', icon: ChartBarIcon, current: false },
    { name: 'Pedir Cartão', href: '/pages/rh/pedir_cartao', icon: CreditCardIcon, current: false },
    { name: 'Validar 2ª Via', href: '/pages/rh/validar2via', icon: DocumentCheckIcon, current: false },
    { name: 'Gerir Cartão', href: '/pages/rh/gerir_cartao', icon: CogIcon, current: false },
  ],
  rs: [
    { name: 'Dashboard', href: '/pages/rs/dashboard', icon: ChartBarIcon, current: false },
  ],
  servico: [
    { name: 'Dashboard', href: '/pages/servico/dashboard', icon: WrenchScrewdriverIcon, current: false },
    { name: 'Pedido Cartão', href: '/pages/servico/pedido_cartao', icon: CreditCardIcon, current: false },
  ],
  ipo: [
    { name: 'Dashboard', href: '/pages/ipo/dashboard', icon: BuildingOfficeIcon, current: false },
  ]
}

export function getNavigationForSection(section: string, currentPath: string) {
  const nav = navigationConfig[section as keyof typeof navigationConfig] || []
  return nav.map(item => ({
    ...item,
    current: item.href === currentPath
  }))
}