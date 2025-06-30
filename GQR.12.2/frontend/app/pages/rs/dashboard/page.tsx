'use client'

import { useState } from 'react'
import {
  ClockIcon,
  CheckCircleIcon,
  IdentificationIcon,
  ExclamationCircleIcon,
  HomeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

export default function DashboardRiscoSeguranca() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const notifications = [
    {
      id: 1,
      title: 'Alerta de Segurança',
      description: 'Acesso não autorizado detectado no Bloco Operatório.',
      time: 'Há 2 minutos',
      status: 'error',
    },
    {
      id: 2,
      title: 'Cartão Expirado',
      description: 'O cartão de acesso de um funcionário expirou.',
      time: 'Há 1 hora',
      status: 'warning',
    },
    {
      id: 3,
      title: 'Pedido de Acesso',
      description: 'Novo pedido de acesso para a Ala B.',
      time: 'Há 5 horas',
      status: 'new',
    },
  ]

  const navigation = [
    { name: 'Dashboard', href: '/pages/rs/dashboard', icon: ChartBarIcon, current: true },
  ]

  const stats = [
    { name: 'Cartões Pendentes', value: '29' },
    { name: 'Cartões Ativos', value: '200' },
    { name: 'Cartões Expirados', value: '60' },
    { name: 'Bloco Operatório', value: '', icon: HomeIcon },
  ]

  const tableData = [
    { prioridade: 'Alta', n_mec: '00000', local: 'BLOCO', data: '22/07/2000', status: 'Pendente', obs: '' },
    { prioridade: 'Média', n_mec: '00000', local: 'ALA B', data: '22/07/2000', status: 'Pendente', obs: '' },
    { prioridade: 'Alta', n_mec: '00000', local: 'UIPM', data: '22/07/2000', status: 'Pendente', obs: '' },
    { prioridade: 'Baixa', n_mec: '00000', local: 'GIE', data: '22/07/2000', status: 'Pendente', obs: '' },
  ]

  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'alta':
        return 'bg-red-100 text-red-800'
      case 'média':
        return 'bg-yellow-100 text-yellow-800'
      case 'baixa':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="DASHBOARD RISCO SEGURANÇA"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          showBackButton={true}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {item.icon && <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />}
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                              {item.name}
                            </dt>
                            <dd>
                              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {item.value}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Pedidos Recentes
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Prioridade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          N_Mec
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Local
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Obs
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {tableData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(
                                row.prioridade
                              )}`}
                            >
                              {row.prioridade}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {row.n_mec}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {row.local}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {row.data}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {row.status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {row.obs}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
