'use client'

import { Fragment, useState } from 'react'
import { 
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  IdentificationIcon,
  ExclamationCircleIcon 
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
              
              {/* Gráfico de estatísticas */}
              <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <Line options={chartOptions} data={chartData} />
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