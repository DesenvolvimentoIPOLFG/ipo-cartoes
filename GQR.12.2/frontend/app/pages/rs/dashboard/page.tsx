'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DashboardRiscoSeguranca() {
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
    { name: 'Pedidos Urgentes', value: '2' },
    { name: 'Pedidos a Expirar em 7 Dias', value: '15' },
    { name: 'Taxa de Resposta', value: '85%' },
    { name: 'Média de Tempo de Resposta', value: '6 horas' },
  ]

  const priorityChartData = {
    labels: ['Alta', 'Média', 'Baixa'],
    datasets: [
      {
        label: 'Pedidos',
        data: [28, 17, 14],
        backgroundColor: ['#F87171', '#FBBF24', '#34D399'],
        borderRadius: 4,
      },
    ],
  }

  const priorityChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 35,
      },
    },
  }

  const priorityTableData = [
    { prioridade: 'Alta', n_mec: '000000', local: 'BLOCO', data: '22/07/2000', status: 'Pendente', obs1: 'há 2 dias', obs2: 'há 2 dias' },
    { prioridade: 'Média', n_mec: '000000', local: 'ALA B', data: '22/07/2000', status: 'Pendente', obs1: 'há 4 dias', obs2: 'há 4 dias' },
    { prioridade: 'Alta', n_mec: '000000', local: 'UIPM', data: '22/07/2000', status: 'Pendente', obs1: 'há 1 dia', obs2: 'há 3 dias' },
    { prioridade: 'Baixa', n_mec: '000000', local: 'GIE', data: '22/07/2000', status: 'Pendente', obs1: 'há 5 dias', obs2: 'há 3 dias' },
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="DASHBOARD RISCO SEGURANÇA"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          showBackButton={true}
        />

        <main className="flex-1">
          <div className="py-8 px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.slice(0, 4).map((item) => (
                <div key={item.name} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{item.name}</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{item.value}</dd>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {stats.slice(4, 7).map((item) => (
                    <div key={item.name} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{item.name}</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{item.value}</dd>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pedidos por Prioridade</h3>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Filtro</button>
                    <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Local</button>
                    <button className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50">
                        <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                        Marcar como
                    </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 h-64">
                  <Bar options={priorityChartOptions} data={priorityChartData} />
                </div>
                <div className="lg:col-span-2 overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Prioridade</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">N.Mec</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Local</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Data</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Obs</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Obs</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      {priorityTableData.map((row, index) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(row.prioridade)}`}>
                              {row.prioridade}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.n_mec}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.local}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.data}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.status}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.obs1}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.obs2}</td>
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
