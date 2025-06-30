'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  MapPinIcon,
  EyeIcon,
  PencilIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

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

  const navigation = getNavigationForSection('rs', '/pages/rs/dashboard')

  const stats = [
    { 
      name: 'Cartões Pendentes', 
      value: '29',
      icon: ClockIcon,
      color: 'text-yellow-500'
    },
    { 
      name: 'Cartões Ativos', 
      value: '200',
      icon: CheckCircleIcon,
      color: 'text-green-500'
    },
    { 
      name: 'Cartões Expirados', 
      value: '60',
      icon: ExclamationTriangleIcon,
      color: 'text-red-500'
    },
    { 
      name: 'Pedidos Urgentes', 
      value: '2',
      icon: ExclamationTriangleIcon,
      color: 'text-red-600'
    },
    { 
      name: 'Taxa de Resposta', 
      value: '85%',
      icon: ChartPieIcon,
      color: 'text-purple-500'
    },
    { 
      name: 'Média de Tempo de Resposta', 
      value: '6 horas',
      icon: ClockIcon,
      color: 'text-indigo-500'
    },
  ]

  // Reduced table data to fit viewport without scrolling
  const priorityTableData = [
    { 
      id: 1,
      prioridade: 'Alta', 
      n_mec: '000000', 
      nome: 'João Silva',
      local: 'BLOCO OPERATÓRIO', 
      data: '22/07/2024', 
      status: 'Pendente', 
      tempo: 'há 2 dias',
      tipo: 'Novo Cartão',
      obs: 'Urgente - Acesso ao bloco operatório'
    },
    { 
      id: 2,
      prioridade: 'Média', 
      n_mec: '000001', 
      nome: 'Maria Santos',
      local: 'ALA B', 
      data: '20/07/2024', 
      status: 'Pendente', 
      tempo: 'há 4 dias',
      tipo: '2ª Via',
      obs: 'Cartão perdido'
    },
    { 
      id: 3,
      prioridade: 'Alta', 
      n_mec: '000002', 
      nome: 'Carlos Oliveira',
      local: 'UIPM', 
      data: '23/07/2024', 
      status: 'Pendente', 
      tempo: 'há 1 dia',
      tipo: 'Renovação',
      obs: 'Cartão expirado'
    },
    { 
      id: 4,
      prioridade: 'Baixa', 
      n_mec: '000003', 
      nome: 'Ana Costa',
      local: 'GIE', 
      data: '19/07/2024', 
      status: 'Pendente', 
      tempo: 'há 5 dias',
      tipo: 'Novo Cartão',
      obs: 'Primeiro acesso'
    },
    { 
      id: 5,
      prioridade: 'Alta', 
      n_mec: '000004', 
      nome: 'Pedro Ferreira',
      local: 'BLOCO OPERATÓRIO', 
      data: '24/07/2024', 
      status: 'Em Análise', 
      tempo: 'há 1 hora',
      tipo: 'Urgente',
      obs: 'Emergência médica'
    },
    { 
      id: 6,
      prioridade: 'Média', 
      n_mec: '000005', 
      nome: 'Sofia Rodrigues',
      local: 'ALA A', 
      data: '21/07/2024', 
      status: 'Aprovado', 
      tempo: 'há 3 dias',
      tipo: 'Renovação',
      obs: 'Renovação anual'
    },
    { 
      id: 7,
      prioridade: 'Baixa', 
      n_mec: '000006', 
      nome: 'Miguel Pereira',
      local: 'LABORATÓRIO', 
      data: '18/07/2024', 
      status: 'Pendente', 
      tempo: 'há 6 dias',
      tipo: 'Novo Cartão',
      obs: 'Transferência de departamento'
    },
    { 
      id: 8,
      prioridade: 'Alta', 
      n_mec: '000007', 
      nome: 'Catarina Lopes',
      local: 'UCI', 
      data: '25/07/2024', 
      status: 'Em Análise', 
      tempo: 'há 30 min',
      tipo: 'Urgente',
      obs: 'Acesso crítico necessário'
    },
    { 
      id: 9,
      prioridade: 'Média', 
      n_mec: '000008', 
      nome: 'Ricardo Martins',
      local: 'FARMÁCIA', 
      data: '17/07/2024', 
      status: 'Rejeitado', 
      tempo: 'há 7 dias',
      tipo: '2ª Via',
      obs: 'Documentação incompleta'
    },
    { 
      id: 10,
      prioridade: 'Baixa',
      n_mec: '000009',
      nome: 'Teresa Silva',
      local: 'ADMINISTRAÇÃO',
      data: '16/07/2024',
      status: 'Aprovado',
      tempo: 'há 8 dias',
      tipo: 'Renovação',
      obs: 'Processo concluído'
    },
    { 
      id: 11,
      prioridade: 'Alta',
      n_mec: '000010',
      nome: 'Bruno Costa',
      local: 'URGÊNCIAS',
      data: '25/07/2024',
      status: 'Pendente',
      tempo: 'há 45 min',
      tipo: 'Novo Cartão',
      obs: 'Novo funcionário - urgente'
    },
    { 
      id: 12,
      prioridade: 'Média',
      n_mec: '000011',
      nome: 'Inês Fernandes',
      local: 'RADIOLOGIA',
      data: '22/07/2024',
      status: 'Em Análise',
      tempo: 'há 2 dias',
      tipo: '2ª Via',
      obs: 'Cartão danificado'
    },
    { 
      id: 13,
      prioridade: 'Baixa',
      n_mec: '000012',
      nome: 'Luís Soares',
      local: 'MANUTENÇÃO',
      data: '15/07/2024',
      status: 'Aprovado',
      tempo: 'há 9 dias',
      tipo: 'Renovação',
      obs: 'Renovação trimestral'
    },
    { 
      id: 14,
      prioridade: 'Alta',
      n_mec: '000013',
      nome: 'Patrícia Alves',
      local: 'PEDIATRIA',
      data: '26/07/2024',
      status: 'Pendente',
      tempo: 'há 15 min',
      tipo: 'Urgente',
      obs: 'Emergência pediátrica'
    },
    { 
      id: 15,
      prioridade: 'Média',
      n_mec: '000014',
      nome: 'Rui Carvalho',
      local: 'CARDIOLOGIA',
      data: '14/07/2024',
      status: 'Rejeitado',
      tempo: 'há 10 dias',
      tipo: 'Novo Cartão',
      obs: 'Falta autorização superior'
    }
  ]

  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'alta':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
      case 'média':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
      case 'baixa':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    }
  }

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
      case 'em análise':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
      case 'aprovado':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
      case 'rejeitado':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    }
  }

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col h-full">
        <Navbar
          title="DASHBOARD RISCO SEGURANÇA"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 p-4 space-y-4">
              <div className="max-w-7xl mx-auto">
                {/* Stats Cards - Reduced spacing */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 mb-4">
                  {stats.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
                    >
                      <div className="p-2">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <item.icon className={`h-4 w-4 ${item.color}`} aria-hidden="true" />
                          </div>
                          <div className="ml-2 w-0 flex-1">
                            <dl>
                              <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 break-words leading-tight">
                                {item.name}
                              </dt>
                              <dd className="flex items-baseline">
                                <div className="text-base font-semibold text-gray-900 dark:text-white break-words leading-tight">
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

                {/* Priority Requests Table - Constrained height */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col" style={{height: 'calc(100vh - 280px)'}}>
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Pedidos por Prioridade</h3>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Prioridade
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              N_MEC
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Local
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Data
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              OBS
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {priorityTableData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-3 py-2 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityClass(row.prioridade)}`}>
                                  {row.prioridade}
                                </span>
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {row.n_mec}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {row.local}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {row.data}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(row.status)}`}>
                                  {row.status}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-sm text-gray-900 dark:text-white max-w-xs truncate">
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