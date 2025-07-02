'use client'

import { useState, useEffect } from 'react'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

function SLAStatus({ horas }: { horas: number }) {
  if (horas > 48) {
    return <span className="text-red-600 font-bold">SLA Excedido</span>
  }
  if (horas > 24) {
    return <span className="text-yellow-600 font-semibold">Atenção SLA</span>
  }
  return <span className="text-green-600 font-semibold">Dentro SLA</span>
}

export default function PedidoCartaoServico() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showChecklist, setShowChecklist] = useState(false)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(() => setLastUpdate(new Date()), 120000)
    return () => clearInterval(interval)
  }, [autoRefresh])

  const navigation = getNavigationForSection('servico', '/pages/servico/pedido_cartao')

  // Estatísticas específicas para pedidos de cartão - mais simples e consistente
  const stats = [
    { 
      name: 'Novos Pedidos Hoje', 
      value: '12',
      icon: DocumentTextIcon,
      color: 'text-blue-500'
    },
    { 
      name: 'Aguardando Análise', 
      value: '23',
      icon: ClockIcon,
      color: 'text-yellow-500'
    },
    { 
      name: 'Pedidos 2ª Via', 
      value: '15',
      icon: ArrowPathIcon,
      color: 'text-purple-500'
    },
    { 
      name: 'Novos Colaboradores', 
      value: '8',
      icon: UserPlusIcon,
      color: 'text-indigo-500'
    },
  ]

  const tableData = [
    { id: 1, data: '22/07/2024', estado: 'PENDENTE', horas: 12, tags: ['Urgente'], checklist: false, nome: 'João Silva', motivo: '2ª Via - Cartão perdido' },
    { id: 2, data: '21/07/2024', estado: 'PENDENTE', horas: 50, tags: ['Temporário'], checklist: true, nome: 'Maria Santos', motivo: '1ª Via - Novo colaborador' },
    { id: 3, data: '20/07/2024', estado: 'PENDENTE', horas: 30, tags: ['Permanente'], checklist: false, nome: 'Carlos Oliveira', motivo: '2ª Via - Cartão danificado' },
    { id: 4, data: '19/07/2024', estado: 'PENDENTE', horas: 5, tags: [], checklist: false, nome: 'Ana Costa', motivo: '1ª Via - Transferência' },
    { id: 5, data: '18/07/2024', estado: 'APROVADO', horas: 72, tags: ['Urgente'], checklist: true, nome: 'Pedro Ferreira', motivo: '2ª Via - Cartão roubado' },
    { id: 6, data: '17/07/2024', estado: 'RECUSADO', horas: 96, tags: [], checklist: false, nome: 'Sofia Rodrigues', motivo: '1ª Via - Documentação incompleta' },
    { id: 7, data: '26/07/2024', estado: 'PENDENTE', horas: 8, tags: ['Urgente'], checklist: false, nome: 'Miguel Pereira', motivo: '2ª Via - Cartão expirado' },
    { id: 8, data: '25/07/2024', estado: 'PENDENTE', horas: 24, tags: ['Temporário'], checklist: true, nome: 'Catarina Lopes', motivo: '1ª Via - Novo funcionário' },
    { id: 9, data: '24/07/2024', estado: 'APROVADO', horas: 48, tags: [], checklist: false, nome: 'Ricardo Martins', motivo: '2ª Via - Cartão danificado' },
    { id: 10, data: '23/07/2024', estado: 'PENDENTE', horas: 36, tags: ['Permanente'], checklist: true, nome: 'Teresa Silva', motivo: '1ª Via - Transferência departamento' },
    { id: 11, data: '22/07/2024', estado: 'RECUSADO', horas: 120, tags: [], checklist: false, nome: 'Bruno Costa', motivo: '2ª Via - Documentação inválida' },
    { id: 12, data: '21/07/2024', estado: 'PENDENTE', horas: 16, tags: ['Urgente'], checklist: false, nome: 'Inês Fernandes', motivo: '1ª Via - Novo colaborador' },
    { id: 13, data: '20/07/2024', estado: 'APROVADO', horas: 60, tags: ['Temporário'], checklist: true, nome: 'Luís Soares', motivo: '2ª Via - Cartão perdido' },
    { id: 14, data: '19/07/2024', estado: 'PENDENTE', horas: 4, tags: [], checklist: false, nome: 'Patrícia Alves', motivo: '1ª Via - Contrato temporário' },
    { id: 15, data: '18/07/2024', estado: 'RECUSADO', horas: 144, tags: [], checklist: false, nome: 'Rui Carvalho', motivo: '2ª Via - Autorização pendente' },
    { id: 16, data: '27/07/2024', estado: 'PENDENTE', horas: 2, tags: ['Urgente'], checklist: false, nome: 'Sandra Oliveira', motivo: '2ª Via - Emergência' },
    { id: 17, data: '26/07/2024', estado: 'PENDENTE', horas: 20, tags: ['Permanente'], checklist: true, nome: 'Nuno Ribeiro', motivo: '1ª Via - Novo departamento' },
    { id: 18, data: '25/07/2024', estado: 'APROVADO', horas: 40, tags: [], checklist: false, nome: 'Cristina Moura', motivo: '2ª Via - Renovação' },
    { id: 19, data: '24/07/2024', estado: 'PENDENTE', horas: 28, tags: ['Temporário'], checklist: true, nome: 'Vítor Gomes', motivo: '1ª Via - Estagiário' },
    { id: 20, data: '23/07/2024', estado: 'RECUSADO', horas: 168, tags: [], checklist: false, nome: 'Helena Dias', motivo: '2ª Via - Processo incompleto' }
  ]

  const estadoColor: Record<string, string> = {
    'PENDENTE': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    'APROVADO': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    'RECUSADO': 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
  }

  const notifications = [
    {
      id: 1,
      title: 'Novos pedidos',
      description: '3 pedidos de 2.ª via acabaram de chegar',
      time: 'Agora mesmo',
      status: 'info',
    },
    {
      id: 2,
      title: 'Expiração de cartões',
      description: 'Cartões expiram no dia 30/07/2024',
      time: 'Hoje',
      status: 'alerta',
    },
  ]

  // Filtros
  const filteredData = tableData.filter(row => {
    const searchMatch =
      row.nome.toLowerCase().includes(search.toLowerCase()) ||
      row.id.toString().includes(search) ||
      row.motivo.toLowerCase().includes(search.toLowerCase())
    const estadoMatch = estadoFilter ? row.estado === estadoFilter : true
    return searchMatch && estadoMatch
  })

  function toggleRow(id: number) {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  function handleMassAction(action: 'aprovar' | 'recusar') {
    alert(
      `Pedidos ${selectedRows.join(', ')} ${action === 'aprovar' ? 'aprovados' : 'recusados'}`
    )
    setSelectedRows([])
  }

  function handleManualRefresh() {
    setLastUpdate(new Date())
  }

  function handleAprovar(id: number) {
    const pedido = filteredData.find(p => p.id === id)
    alert(`Pedido ${id} de ${pedido?.nome} aprovado!`)
  }

  function handleRecusar(id: number) {
    const pedido = filteredData.find(p => p.id === id)
    alert(`Pedido ${id} de ${pedido?.nome} recusado!`)
  }

  const checklistSteps = [
    'Verificar anexos obrigatórios',
    'Confirmar dados do colaborador',
    'Validar motivo do pedido',
    'Verificar aprovação do responsável'
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="PEDIDO DE CARTÃO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Stats Cards - Simplified design matching other pages */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                {stats.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
                  >
                    <div className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                        </div>
                        <div className="ml-3 w-0 flex-1">
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

              {/* Filtros e Pesquisa - Updated to match gerir_cartao style */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    {/* Primeira linha - Pesquisa e botão de filtros */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Pesquisar por ID, Nome ou Motivo"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowFilters(!showFilters)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <FunnelIcon className="h-4 w-4 mr-2" />
                          Filtros
                        </button>
                        
                        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Novo Pedido de 2.ª Via
                        </button>
                      </div>
                    </div>
                    
                    {/* Segunda linha - Filtros (condicionalmente visível) */}
                    {showFilters && (
                      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="sm:w-48">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Estado
                          </label>
                          <select
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            value={estadoFilter}
                            onChange={(e) => setEstadoFilter(e.target.value)}
                          >
                            <option value="">Todos os Estados</option>
                            <option value="PENDENTE">Pendente</option>
                            <option value="APROVADO">Aprovado</option>
                            <option value="RECUSADO">Recusado</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabela - Updated height calculation */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col" style={{height: showFilters ? 'calc(100vh - 500px)' : 'calc(100vh - 400px)'}}>
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Pedidos de Cartão
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-300">
                      Atualizado há {Math.round((Date.now() - lastUpdate.getTime()) / 60000)} min
                    </span>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="h-full overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            ID Pedido
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Data
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredData.map((row) => (
                          <tr
                            key={row.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {row.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {row.data}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full font-semibold text-xs ${estadoColor[row.estado] || 'bg-gray-200 text-gray-800'}`}>
                                {row.estado}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {row.estado === 'PENDENTE' ? (
                                <div className="flex justify-center gap-2">
                                  <button
                                    onClick={() => handleAprovar(row.id)}
                                    className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 hover:bg-green-200 transition text-xs"
                                    title="Aprovar"
                                    type="button"
                                  >
                                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                                    Aprovar
                                  </button>
                                  <button
                                    onClick={() => handleRecusar(row.id)}
                                    className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 transition text-xs"
                                    title="Recusar"
                                    type="button"
                                  >
                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                    Recusar
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="inline-flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 transition"
                                  title="Ver detalhes"
                                  type="button"
                                >
                                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                                </button>
                              )}
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