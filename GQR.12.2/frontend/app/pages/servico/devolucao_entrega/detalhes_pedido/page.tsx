'use client'

import { useState, useEffect } from 'react'
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  ArrowPathIcon,
  TagIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

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
  const [tagsFilter, setTagsFilter] = useState('')

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(() => setLastUpdate(new Date()), 120000)
    return () => clearInterval(interval)
  }, [autoRefresh])

  const tableData = [
    { id: 1, data: '22/07/2000', estado: 'PENDENTE', horas: 12, tags: ['Urgente'], checklist: false },
    { id: 2, data: '22/07/2000', estado: 'PENDENTE', horas: 50, tags: ['Temporário'], checklist: true },
    { id: 3, data: '22/07/2000', estado: 'PENDENTE', horas: 30, tags: ['Permanente'], checklist: false },
    { id: 4, data: '22/07/2000', estado: 'PENDENTE', horas: 5, tags: [], checklist: false },
  ]

  const estadoColor: Record<string, string> = {
    'PENDENTE': 'bg-yellow-100 text-yellow-800',
  }

  const notificacoes = [
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

  // Sidebar navigation with subItems for Resumo Pedido
  const navigation = [
    { name: 'Dashboard', href: '/pages/servico/dashboard', icon: ChartBarIcon, current: false },
    { name: 'Pedido_Cartão', href: '/pages/servico/pedido_cartao', icon: ChartBarIcon, current: false },
    {
      name: 'Devolução/Entrega',
      href: '/pages/servico/devolucao_entrega',
      icon: ChartBarIcon,
      current: false,
      subItems: [
        { name: 'Detalhes do Pedido', href: '/pages/servico/devolucao_entrega/detalhes_pedido', current: true },
        { name: 'Ação Devolução', href: '/pages/servico/devolucao_entrega/acao_devolucao', current: false },
        { name: 'Historico', href: '/pages/servico/devolucao_entrega/historico', current: false },
      ],
    },
  ];

  const filteredData = tagsFilter
    ? tableData.filter(row => row.tags.includes(tagsFilter))
    : tableData

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

  const checklistSteps = [
    'Verificar anexos',
    'Confirmar dados do colaborador',
    'Validar motivo do pedido',
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
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">

              {/* Quick Links e Filtros */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex flex-row gap-2">
                  <button className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs font-semibold">
                    <PlusCircleIcon className="h-4 w-4" /> Novo Pedido de 2.ª Via
                  </button>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-300">
                      Atualizado há {Math.round((Date.now() - lastUpdate.getTime()) / 60000)} min
                    </span>
                    <button
                      onClick={handleManualRefresh}
                      className="flex items-center px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-xs font-semibold"
                    >
                      <ArrowPathIcon className="h-4 w-4 mr-1" /> Atualizar Agora
                    </button>
                  </div>
                </div>
              </div>

              {/* Filtros por tags */}
              <div className="flex gap-2 mb-4">
                <TagIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={tagsFilter}
                  onChange={e => setTagsFilter(e.target.value)}
                  className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-1 px-2 text-xs"
                >
                  <option value="">Todas as Tags</option>
                  <option value="Urgente">Urgente</option>
                  <option value="Temporário">Temporário</option>
                  <option value="Permanente">Permanente</option>
                </select>
                <button
                  className="ml-auto flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-xs font-semibold"
                  onClick={() => setShowChecklist(v => !v)}
                >
                  <CheckCircleIcon className="h-4 w-4" /> Tarefas Pendentes
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-xs font-semibold"
                  onClick={() => alert('Ajuda rápida!')}
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4" /> Ajuda
                </button>
              </div>

              {/* Checklist */}
              {showChecklist && (
                <div className="mb-4 bg-indigo-50 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 rounded p-4">
                  <div className="font-semibold mb-2 text-indigo-700 dark:text-indigo-200">Checklist para concluir pedido:</div>
                  <ul className="list-disc ml-6 text-sm text-gray-700 dark:text-gray-200">
                    {checklistSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ações em massa */}
              {selectedRows.length > 1 && (
                <div className="mb-2 flex gap-2">
                  <button
                    className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-semibold"
                    onClick={() => handleMassAction('aprovar')}
                  >
                    <CheckCircleIcon className="h-4 w-4" /> Aprovar Selecionados
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold"
                    onClick={() => handleMassAction('recusar')}
                  >
                    <XCircleIcon className="h-4 w-4" /> Recusar Selecionados
                  </button>
                </div>
              )}

              {/* Tabela */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Pedidos Recentes
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
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
                          ID_Pedido
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
                            <button
                              className="inline-flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 transition"
                              title="Ver detalhes"
                              type="button"
                            >
                              <MagnifyingGlassIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                            </button>
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
                            <td colSpan={8} className="bg-indigo-50 dark:bg-indigo-900 p-4">
                              <div className="text-xs text-gray-700 dark:text-gray-200">
                                <strong>Detalhes do Pedido {row.id}:</strong>
                                <ul className="list-disc ml-6 mt-2">
                                  <li>Data: {row.data}</li>
                                  <li>Estado: {row.estado}</li>
                                  <li>Tags: {row.tags.join(', ') || '-'}</li>
                                  <li>Checklist: {row.checklist ? 'Completo' : 'Por concluir'}</li>
                                  <li>Tempo pendente: {row.horas} horas</li>
                                </ul>
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
        </main>
      </div>

      <NotificationsPanel
        isOpen={notificationsOpen}
        setIsOpen={setNotificationsOpen}
        notifications={notificacoes}
      />
    </div>
  )
}