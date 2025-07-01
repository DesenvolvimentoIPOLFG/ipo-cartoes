'use client'

import { useState, useEffect } from 'react'
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  UserPlusIcon,
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
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [tagsFilter, setTagsFilter] = useState('')

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(() => setLastUpdate(new Date()), 120000)
    return () => clearInterval(interval)
  }, [autoRefresh])

  const navigation = getNavigationForSection('servico', '/pages/servico/pedido_cartao')

  // Estatísticas específicas para pedidos de cartão
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
    const tagsMatch = tagsFilter ? row.tags.includes(tagsFilter) : true
    return searchMatch && estadoMatch && tagsMatch
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
              {/* Stats Cards */}
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

              {/* Quick Actions */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex flex-row gap-2">
                  <button className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm font-semibold">
                    <PlusCircleIcon className="h-5 w-5" /> Novo Pedido
                  </button>
                  {selectedRows.length > 1 && (
                    <>
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold"
                        onClick={() => handleMassAction('aprovar')}
                      >
                        <CheckCircleIcon className="h-5 w-5" /> Aprovar Selecionados
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-semibold"
                        onClick={() => handleMassAction('recusar')}
                      >
                        <XCircleIcon className="h-5 w-5" /> Recusar Selecionados
                      </button>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    Atualizado há {Math.round((Date.now() - lastUpdate.getTime()) / 60000)} min
                  </span>
                  <button
                    onClick={handleManualRefresh}
                    className="flex items-center px-3 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-sm font-semibold"
                  >
                    <ArrowPathIcon className="h-5 w-5 mr-1" /> Atualizar
                  </button>
                </div>
              </div>

              {/* Filtros e Pesquisa */}
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Pesquisar por ID, Nome ou Motivo"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="pl-10 pr-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={estadoFilter}
                    onChange={e => setEstadoFilter(e.target.value)}
                    className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3"
                  >
                    <option value="">Todos os Estados</option>
                    <option value="PENDENTE">Pendente</option>
                    <option value="APROVADO">Aprovado</option>
                    <option value="RECUSADO">Recusado</option>
                  </select>
                </div>
                <div>
                  <select
                    value={tagsFilter}
                    onChange={e => setTagsFilter(e.target.value)}
                    className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3"
                  >
                    <option value="">Todas as Tags</option>
                    <option value="Urgente">Urgente</option>
                    <option value="Temporário">Temporário</option>
                    <option value="Permanente">Permanente</option>
                  </select>
                </div>
              </div>

              {/* Tabela */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pedidos de Cartão</h3>
                </div>
                <div className="overflow-hidden">
                  <div className="max-h-[500px] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                        <tr>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            <input
                              type="checkbox"
                              checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                              onChange={e =>
                                setSelectedRows(
                                  e.target.checked ? filteredData.map(r => r.id) : []
                                )
                              }
                            />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Nome
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Data
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Tags
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            SLA
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Ações
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredData.map((row) => (
                          <tr
                            key={row.id}
                            className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${row.horas > 48 ? 'bg-red-50 dark:bg-red-900' : ''}`}
                          >
                            <td className="px-2 py-4 text-center">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(row.id)}
                                onChange={() => toggleRow(row.id)}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {row.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {row.nome}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {row.data}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full font-semibold text-xs ${estadoColor[row.estado] || 'bg-gray-200 text-gray-800'}`}>
                                {row.estado}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs">
                              {row.tags.length === 0 ? (
                                <span className="text-gray-400">-</span>
                              ) : (
                                row.tags.map(tag => (
                                  <span key={tag} className="inline-block bg-indigo-100 text-indigo-700 rounded px-2 py-0.5 mr-1">{tag}</span>
                                ))
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-center">
                              <SLAStatus horas={row.horas} />
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
                                <span className="text-gray-400 text-xs">
                                  {row.estado === 'APROVADO' ? 'Aprovado' : 'Recusado'}
                                </span>
                              )}
                            </td>
                            <td className="px-2 py-4 text-center">
                              <button
                                className="inline-flex items-center justify-center"
                                onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                                title="Expandir detalhes"
                                type="button"
                              >
                                <ChevronDownIcon className={`h-5 w-5 transition-transform ${expandedRow === row.id ? 'rotate-180' : ''}`} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {/* Accordions para detalhes */}
                        {filteredData.map(row => (
                          expandedRow === row.id && (
                            <tr key={`details-${row.id}`}>
                              <td colSpan={9} className="bg-indigo-50 dark:bg-indigo-900 p-4">
                                <div className="text-sm text-gray-700 dark:text-gray-200">
                                  <strong>Detalhes do Pedido {row.id}:</strong>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    <div>
                                      <p><strong>Nome:</strong> {row.nome}</p>
                                      <p><strong>Data:</strong> {row.data}</p>
                                      <p><strong>Estado:</strong> {row.estado}</p>
                                    </div>
                                    <div>
                                      <p><strong>Motivo:</strong> {row.motivo}</p>
                                      <p><strong>Tags:</strong> {row.tags.join(', ') || '-'}</p>
                                      <p><strong>Tempo pendente:</strong> {row.horas} horas</p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        ))}
                      </tbody>
                    </table>
                    {filteredData.length === 0 && (
                      <div className="text-center text-gray-500 dark:text-gray-300 py-8">
                        Nenhum resultado encontrado.
                      </div>
                    )}
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