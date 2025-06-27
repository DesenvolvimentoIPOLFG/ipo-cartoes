'use client'

import { Fragment, useState } from 'react'
import { 
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  IdentificationIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
  PresentationChartLineIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [showTable, setShowTable] = useState(false)

  const notifications = [
    {
      id: 1,
      title: 'Novo Pedido de Cartão',
      description: 'João Silva solicitou um novo cartão',
      time: 'Há 5 minutos',
      status: 'new',
    },
    {
      id: 2,
      title: 'Cartão Aprovado',
      description: 'O pedido de Maria Santos foi aprovado',
      time: 'Há 30 minutos',
      status: 'success',
    },
    {
      id: 3,
      title: 'Cartão Expirado',
      description: 'O cartão de Pedro Oliveira expira em 7 dias',
      time: 'Há 2 horas',
      status: 'warning',
    },
  ]
  
  const navigation = [
    { name: 'Dashboard', href: '/pages/rh/dashboard', icon: ChartBarIcon, current: true },
    { name: 'Pedir Cartão', href: '/pages/rh/pedir_cartao', icon: ChartBarIcon, current: false },
    { name: 'Validar 2ª Via', href: '/pages/rh/validar2via', icon: ChartBarIcon, current: false },
    { name: 'Gerir Cartão', href: '/pages/rh/gerir cartao', icon: ChartBarIcon, current: false },
  ]

  const stats = [
    { name: 'Pedidos Pendentes', value: '120' },
    { name: 'Pedidos Aprovados', value: '180' },
    { name: 'Cartões Ativos', value: '200' },
    { name: 'Cartões Expirados', value: '60' },
  ]

  const chartData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Pedidos Pendentes',
        data: [65, 78, 90, 120, 110, 120],
        borderColor: '#EAB308',
        backgroundColor: '#EAB308',
      },
      {
        label: 'Pedidos Aprovados',
        data: [45, 85, 140, 160, 170, 180],
        borderColor: '#22C55E',
        backgroundColor: '#22C55E',
      },
      {
        label: 'Cartões Ativos',
        data: [80, 120, 140, 160, 180, 200],
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Cartões Expirados',
        data: [20, 30, 40, 50, 55, 60],
        borderColor: '#EF4444',
        backgroundColor: '#EF4444',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolução dos Cartões',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  // Dados históricos para a tabela
  const historicalData = [
    { mes: 'Janeiro', pendentes: 65, aprovados: 45, ativos: 80, expirados: 20 },
    { mes: 'Fevereiro', pendentes: 78, aprovados: 85, ativos: 120, expirados: 30 },
    { mes: 'Março', pendentes: 90, aprovados: 140, ativos: 140, expirados: 40 },
    { mes: 'Abril', pendentes: 120, aprovados: 160, ativos: 160, expirados: 50 },
    { mes: 'Maio', pendentes: 110, aprovados: 170, ativos: 180, expirados: 55 },
    { mes: 'Junho', pendentes: 120, aprovados: 180, ativos: 200, expirados: 60 },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="DASHBOARD RECURSOS HUMANOS"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
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
                          {item.name === 'Pedidos Pendentes' && (
                            <ClockIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
                          )}
                          {item.name === 'Pedidos Aprovados' && (
                            <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                          )}
                          {item.name === 'Cartões Ativos' && (
                            <IdentificationIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                          )}
                          {item.name === 'Cartões Expirados' && (
                            <ExclamationCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                          )}
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                              {item.name}
                            </dt>
                            <dd className="flex items-baseline">
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
              
              {/* Gráfico de estatísticas com botão de alternância */}
              <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow relative">
                {/* Botão de alternância */}
                <button
                  onClick={() => setShowTable(!showTable)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800 transition-colors duration-200"
                  title={showTable ? 'Ver Gráfico' : 'Ver Tabela de Histórico'}
                >
                  {showTable ? (
                    <PresentationChartLineIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <TableCellsIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  )}
                </button>

                {!showTable ? (
                  <Line options={chartOptions} data={chartData} />
                ) : (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Histórico de Cartões
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Mês
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Pedidos Pendentes
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Pedidos Aprovados
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Cartões Ativos
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Cartões Expirados
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {historicalData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {row.mes}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 dark:text-yellow-400">
                                {row.pendentes}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                                {row.aprovados}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                                {row.ativos}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                                {row.expirados}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
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