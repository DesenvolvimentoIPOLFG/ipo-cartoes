'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function DashboardServico() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')

  const navigation = getNavigationForSection('servico', '/pages/servico/dashboard')

  const notifications = [
    {
      id: 1,
      title: 'Novo Pedido de Cartão',
      description: 'Pedido de 2ª via recebido para análise.',
      time: 'Há 1 hora',
      status: 'new',
    },
    {
      id: 2,
      title: 'Cartão Aprovado',
      description: 'Cartão de acesso aprovado e pronto para entrega.',
      time: 'Há 3 horas',
      status: 'success',
    },
  ]

  // Estatísticas dos cartões
  const stats = [
    { 
      name: 'Cartões Ativos', 
      value: '156',
      icon: CheckCircleIcon,
      color: 'text-green-500'
    },
    { 
      name: 'Cartões Pendentes', 
      value: '23',
      icon: ClockIcon,
      color: 'text-yellow-500'
    },
    { 
      name: '2ª Via Pendentes', 
      value: '8',
      icon: ExclamationTriangleIcon,
      color: 'text-orange-500'
    },
    { 
      name: 'Cartões Desativados', 
      value: '42',
      icon: XCircleIcon,
      color: 'text-red-500'
    },
  ]

  // Dados da tabela expandidos com mais entradas
  const tableData = [
    { nome: 'JOAQUIM', n_mec: '00000', estado: 'PENDENTE', data: '22/07/2000', tipo_pedido: '2ª VIA' },
    { nome: 'JOAQUIM', n_mec: '00000', estado: 'PENDENTE', data: '22/07/2000', tipo_pedido: '1ª VIA' },
    { nome: 'JOAQUIM', n_mec: '00000', estado: 'PENDENTE', data: '22/07/2000', tipo_pedido: '1ª VIA' },
    { nome: 'JOAQUIM', n_mec: '00000', estado: 'PENDENTE', data: '22/07/2000', tipo_pedido: '2ª VIA' },
    { nome: 'MARIA SILVA', n_mec: '00001', estado: 'ATIVO', data: '15/06/2024', tipo_pedido: '1ª VIA' },
    { nome: 'CARLOS SANTOS', n_mec: '00002', estado: 'PENDENTE', data: '20/07/2024', tipo_pedido: '2ª VIA' },
    { nome: 'ANA COSTA', n_mec: '00003', estado: 'DESATIVADO', data: '10/05/2024', tipo_pedido: '1ª VIA' },
    { nome: 'PEDRO OLIVEIRA', n_mec: '00004', estado: 'ATIVO', data: '18/07/2024', tipo_pedido: '1ª VIA' },
    { nome: 'SOFIA RODRIGUES', n_mec: '00005', estado: 'PENDENTE', data: '25/07/2024', tipo_pedido: '2ª VIA' },
    { nome: 'MIGUEL PEREIRA', n_mec: '00006', estado: 'ATIVO', data: '12/07/2024', tipo_pedido: '1ª VIA' },
    { nome: 'CATARINA LOPES', n_mec: '00007', estado: 'PENDENTE', data: '28/07/2024', tipo_pedido: '2ª VIA' },
    { nome: 'RICARDO MARTINS', n_mec: '00008', estado: 'DESATIVADO', data: '05/06/2024', tipo_pedido: '1ª VIA' },
    { nome: 'TERESA SILVA', n_mec: '00009', estado: 'ATIVO', data: '30/07/2024', tipo_pedido: '1ª VIA' },
    { nome: 'BRUNO COSTA', n_mec: '00010', estado: 'PENDENTE', data: '01/08/2024', tipo_pedido: '2ª VIA' },
    { nome: 'INÊS FERNANDES', n_mec: '00011', estado: 'ATIVO', data: '22/07/2024', tipo_pedido: '1ª VIA' },
    { nome: 'LUÍS SOARES', n_mec: '00012', estado: 'DESATIVADO', data: '15/05/2024', tipo_pedido: '2ª VIA' },
    { nome: 'PATRÍCIA ALVES', n_mec: '00013', estado: 'PENDENTE', data: '02/08/2024', tipo_pedido: '1ª VIA' },
    { nome: 'RUI CARVALHO', n_mec: '00014', estado: 'ATIVO', data: '25/07/2024', tipo_pedido: '2ª VIA' },
    { nome: 'HELENA DIAS', n_mec: '00015', estado: 'PENDENTE', data: '03/08/2024', tipo_pedido: '1ª VIA' },
    { nome: 'JOÃO FERREIRA', n_mec: '00016', estado: 'ATIVO', data: '28/07/2024', tipo_pedido: '2ª VIA' },
    { nome: 'MARIANA GOMES', n_mec: '00017', estado: 'DESATIVADO', data: '20/06/2024', tipo_pedido: '1ª VIA' },
    { nome: 'ANDRÉ RIBEIRO', n_mec: '00018', estado: 'PENDENTE', data: '04/08/2024', tipo_pedido: '2ª VIA' },
    { nome: 'CRISTINA MOURA', n_mec: '00019', estado: 'ATIVO', data: '31/07/2024', tipo_pedido: '1ª VIA' },
    { nome: 'NUNO TEIXEIRA', n_mec: '00020', estado: 'PENDENTE', data: '05/08/2024', tipo_pedido: '2ª VIA' }
  ]

  // Filtros
  const filteredData = tableData.filter(row => {
    const searchMatch =
      row.nome.toLowerCase().includes(search.toLowerCase()) ||
      row.n_mec.includes(search) ||
      row.tipo_pedido.toLowerCase().includes(search.toLowerCase())
    const estadoMatch = estadoFilter ? row.estado === estadoFilter : true
    const tipoMatch = tipoFilter ? row.tipo_pedido === tipoFilter : true
    return searchMatch && estadoMatch && tipoMatch
  })

  // Cores por estado
  const estadoColor: Record<string, string> = {
    'ATIVO': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    'PENDENTE': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    'DESATIVADO': 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
  }

  // Ações rápidas
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

              {/* Filtros e Pesquisa */}
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
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
                  <select
                    value={estadoFilter}
                    onChange={e => setEstadoFilter(e.target.value)}
                    className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3"
                  >
                    <option value="">Todos os Estados</option>
                    <option value="ATIVO">Ativo</option>
                    <option value="PENDENTE">Pendente</option>
                    <option value="DESATIVADO">Desativado</option>
                  </select>
                </div>
                <div>
                  <select
                    value={tipoFilter}
                    onChange={e => setTipoFilter(e.target.value)}
                    className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3"
                  >
                    <option value="">Todos os Tipos</option>
                    <option value="1ª VIA">1ª Via</option>
                    <option value="2ª VIA">2ª Via</option>
                  </select>
                </div>
              </div>

              {/* Tabela */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Gestão de Cartões</h3>
                </div>
                <div className="overflow-hidden">
                  <div className="max-h-[500px] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {row.nome}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {row.n_mec}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full font-semibold text-xs ${estadoColor[row.estado] || 'bg-gray-200 text-gray-800'}`}>
                                {row.estado}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {row.data}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {row.tipo_pedido}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {row.estado === 'PENDENTE' ? (
                                <div className="flex justify-center gap-2">
                                  <button
                                    onClick={() => handleAprovar(idx)}
                                    className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 hover:bg-green-200 transition text-xs"
                                    title="Aprovar"
                                    type="button"
                                  >
                                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                                    Aprovar
                                  </button>
                                  <button
                                    onClick={() => handleRecusar(idx)}
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
                                  onClick={() => handleToggleAtivar(idx)}
                                  className="inline-flex items-center px-2 py-1 rounded bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition text-xs"
                                  title={row.estado === 'ATIVO' ? 'Desativar' : 'Ativar'}
                                  type="button"
                                >
                                  <ArrowPathIcon className="h-4 w-4 mr-1" />
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