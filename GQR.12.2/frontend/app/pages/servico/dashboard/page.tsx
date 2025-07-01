'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

// Sparkline simples (pode ser substituído por um componente real)
function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const points = data.map((v, i) => `${i * 20},${40 - (v / max) * 40}`).join(' ')
  return (
    <svg width="120" height="40" className="inline-block align-middle">
      <polyline
        fill="none"
        stroke="#6366f1"
        strokeWidth="3"
        points={points}
      />
    </svg>
  )
}

export default function DashboardServico() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')

  const navigation = [
    { name: 'Dashboard', href: '/pages/servico/dashboard', icon: ChartBarIcon, current: true },
    { name: 'Pedido_Cartão', href: '/pages/servico/pedido_cartao', icon: ChartBarIcon, current: false },
    { name: 'Devolução/Entrega', href: '/pages/servico/devolucao_entrega', icon: ChartBarIcon, current: false },
  ]

  // Estatísticas dos cartões
  const stats = [
    { name: 'Cartões Ativos', value: 10 },
    { name: 'Cartões Pendentes', value: 5 },
    { name: '2º Via Pendentes', value: 3 },
    { name: 'Cartões Desativados', value: 6 },
  ]

  // Sparkline e percentagem de conclusão (exemplo)
  const sparklineData = [2, 4, 6, 5, 8, 7, 9, 10, 8, 12, 11, 13]
  const percentConclusao = 75

  // Dados da tabela
  const tableData = [
    { nome: 'JOAQUIM', numec: '00000', estado: 'PENDENTE', data: '2024-06-20', tipo: '2ª VIA', dias: 2 },
    { nome: 'JOAQUIM', numec: '00000', estado: 'PENDENTE', data: '2024-06-10', tipo: '1ª VIA', dias: 15 },
    { nome: 'JOAQUIM', numec: '00000', estado: 'ATIVO', data: '2024-06-01', tipo: '1ª VIA', dias: 0 },
    { nome: 'JOAQUIM', numec: '00000', estado: 'DESATIVADO', data: '2024-05-15', tipo: '2ª VIA', dias: 0 },
  ]

  // Filtros
  const filteredData = tableData.filter(row => {
    const searchMatch =
      row.nome.toLowerCase().includes(search.toLowerCase()) ||
      row.numec.includes(search) ||
      row.tipo.toLowerCase().includes(search.toLowerCase())
    const estadoMatch = estadoFilter ? row.estado === estadoFilter : true
    const tipoMatch = tipoFilter ? row.tipo === tipoFilter : true
    const dataMatch =
      (!dataInicio || row.data >= dataInicio) &&
      (!dataFim || row.data <= dataFim)
    return searchMatch && estadoMatch && tipoMatch && dataMatch
  })

  // Cores por estado (corrigido para evitar erro TS)
  const estadoColor: Record<string, string> = {
    'ATIVO': 'bg-green-100 text-green-800',
    'PENDENTE': 'bg-yellow-100 text-yellow-800',
    'DESATIVADO': 'bg-red-100 text-red-800',
  }

  // Ações rápidas (exemplo)
  function handleAprovar(idx: number) {
    alert(`Pedido de ${filteredData[idx].nome} aprovado!`)
  }
  function handleRecusar(idx: number) {
    alert(`Pedido de ${filteredData[idx].nome} recusado!`)
  }
  function handleToggleAtivar(idx: number) {
    alert(`Cartão de ${filteredData[idx].nome} ativado/desativado!`)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="DASHBOARD SERVIÇO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

              {/* Indicadores Avançados */}
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                <div className="flex-1 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="ml-0 w-0 flex-1">
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
                <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow p-4 min-w-[220px]">
                  <span className="text-sm text-gray-500 dark:text-gray-300 mb-2">Evolução 2ª Via (mês)</span>
                  <Sparkline data={sparklineData} />
                  <span className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                    75% dos pedidos de 2ª via aprovados este mês
                  </span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${percentConclusao}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Filtros e Pesquisa */}
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                <div className="flex-1 flex gap-2">
                  <div className="relative w-full">
                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Pesquisar por Nome, N_MEC ou Tipo de pedido"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="pl-10 pr-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                  <select
                    value={estadoFilter}
                    onChange={e => setEstadoFilter(e.target.value)}
                    className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3"
                  >
                    <option value="">Todos</option>
                    <option value="ATIVO">Ativo</option>
                    <option value="PENDENTE">Pendente</option>
                    <option value="DESATIVADO">Desativado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de Pedido</label>
                  <select
                    value={tipoFilter}
                    onChange={e => setTipoFilter(e.target.value)}
                    className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3"
                  >
                    <option value="">Todos</option>
                    <option value="1ª VIA">1ª Via</option>
                    <option value="2ª VIA">2ª Via</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Data início</label>
                  <input
                    type="date"
                    value={dataInicio}
                    onChange={e => setDataInicio(e.target.value)}
                    className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Data fim</label>
                  <input
                    type="date"
                    value={dataFim}
                    onChange={e => setDataFim(e.target.value)}
                    className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3"
                  />
                </div>
              </div>

              {/* Tabela */}
              <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Cartões Pendentes
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Nome
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          N_MEC
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Tipo Pedido
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            {row.nome}
                            {/* Alerta se pendente há mais de 7 dias */}
                            {row.estado === 'PENDENTE' && row.dias > 7 && (
                              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" title="Pendente há mais de 7 dias" />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {row.numec}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full font-semibold text-xs ${estadoColor[row.estado] || 'bg-gray-200 text-gray-800'}`}>
                              {row.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {row.data.split('-').reverse().join('/')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {row.tipo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            {row.estado === 'PENDENTE' ? (
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleAprovar(idx)}
                                  className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 hover:bg-green-200 transition"
                                  title="Aprovar"
                                  type="button"
                                >
                                  <CheckCircleIcon className="h-5 w-5 mr-1" />
                                  Aprovar
                                </button>
                                <button
                                  onClick={() => handleRecusar(idx)}
                                  className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 transition"
                                  title="Recusar"
                                  type="button"
                                >
                                  <XCircleIcon className="h-5 w-5 mr-1" />
                                  Recusar
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleToggleAtivar(idx)}
                                className="inline-flex items-center px-2 py-1 rounded bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition"
                                title={row.estado === 'ATIVO' ? 'Desativar' : 'Ativar'}
                                type="button"
                              >
                                <ArrowPathIcon className="h-5 w-5 mr-1" />
                                {row.estado === 'ATIVO' ? 'Desativar' : 'Ativar'}
                              </button>
                            )}
                          </td>
                        </tr>
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
        notifications={[]}
      />
    </div>
  )
}