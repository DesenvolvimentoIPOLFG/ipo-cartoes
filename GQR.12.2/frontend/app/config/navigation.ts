import {
  ChartBarIcon,
  CreditCardIcon,
  DocumentCheckIcon,
  CogIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  TruckIcon
} from '@heroicons/react/24/outline'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

type IconType = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
  title?: string | undefined;
  titleId?: string | undefined;
} & RefAttributes<SVGSVGElement>>

interface SubNavigationItem {
  name: string
  href: string
  current: boolean
}

interface NavigationItem {
  name: string
  href: string
  icon: IconType
  current: boolean
  subItems?: SubNavigationItem[]
}

interface NavigationConfig {
  rh: NavigationItem[]
  rs: NavigationItem[]
  servico: NavigationItem[]
  ipo: NavigationItem[]
}

export const navigationConfig: NavigationConfig = {
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
    { 
      name: 'Pedido Cartão', 
      href: '/pages/servico/pedido_cartao', 
      icon: CreditCardIcon, 
      current: false,
      subItems: [
        { name: 'Resumo Pedido', href: '/pages/servico/pedido_cartao/resumo_pedido', current: false },
        { name: 'Acessos Solicitados', href: '/pages/servico/pedido_cartao/acessos_solicitados', current: false },
        { name: 'Avaliação Responsável', href: '/pages/servico/pedido_cartao/avaliacao_responsavel', current: false },
        { name: 'Historico', href: '/pages/servico/pedido_cartao/historico', current: false }
      ]
    },
    { 
      name: 'Devolução/Entrega', 
      href: '/pages/servico/devolucao_entrega', 
      icon: TruckIcon, 
      current: false,
      subItems: [
        { name: 'Ação Devolução', href: '/pages/servico/devolucao_entrega/acao_devolucao', current: false },
        { name: 'Detalhes Pedido', href: '/pages/servico/devolucao_entrega/detalhes_pedido', current: false },
        { name: 'Histórico', href: '/pages/servico/devolucao_entrega/historico', current: false }
      ]
    }
  ],
  ipo: [
    { name: 'Dashboard', href: '/pages/ipo/dashboard', icon: BuildingOfficeIcon, current: false },
  ]
}

export function getNavigationForSection(section: string, currentPath: string): NavigationItem[] {
  const nav = navigationConfig[section as keyof typeof navigationConfig] || []
  return nav.map(item => {
    const updatedItem: NavigationItem = {
      ...item,
      current: item.href === currentPath
    }
    
    // Handle subItems if they exist
    if (item.subItems) {
      updatedItem.subItems = item.subItems.map((subItem: SubNavigationItem) => ({
        ...subItem,
        current: subItem.href === currentPath
      }))
    }
    
    return updatedItem
  })
}