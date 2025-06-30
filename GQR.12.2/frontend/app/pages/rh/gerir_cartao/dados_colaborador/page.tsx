'use client'

import { Fragment, useState } from 'react'
import { 
  ChartBarIcon,
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

export default function DadosColaborador() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const notifications = [
    {
      id: 1,
      title: 'Dados Atualizados',
      description: 'Informações do colaborador foram atualizadas com sucesso',
      time: 'Há 5 minutos',
      status: 'success',
    },
    {
      id: 2,
      title: 'Verificação Pendente',
      description: 'Dados do colaborador necessitam de verificação',
      time: 'Há 1 hora',
      status: 'warning',
    },
    {
      id: 3,
      title: 'Novo Colaborador',
      description: 'Novo colaborador adicionado ao sistema',
      time: 'Há 2 horas',
      status: 'info',
    },
  ]
  
  const navigation = [
    { name: 'Dashboard', href: '/pages/rh/dashboard', icon: ChartBarIcon, current: false },
    { name: 'Pedir Cartão', href: '/pages/rh/pedir_cartao', icon: ChartBarIcon, current: false },
    { name: 'Validar 2ª Via', href: '/pages/rh/validar2via', icon: ChartBarIcon, current: false },
    { 
      name: 'Gerir Cartão', 
      href: '/pages/rh/gerir_cartao', 
      icon: ChartBarIcon, 
      current: true,
      subItems: [
        { name: 'Dados do Colaborador', href: '/pages/rh/gerir_cartao/dados_colaborador', current: true },
        { name: 'Cartão', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao', current: false },
        { name: 'Ações', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao/acoes', current: false }
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="DADOS DO COLABORADOR"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Page content will go here */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <UserIcon className="h-5 w-5 mr-2" />
                    Informações do Colaborador
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-500 dark:text-gray-400">
                    Esta página será desenvolvida para mostrar e editar os dados detalhados do colaborador.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <NotificationsPanel
        isOpen={notificationsOpen}
        setIsOpen={setNotificationsOpen}
        notifications={notifications}
      />
    </div>
  )
}