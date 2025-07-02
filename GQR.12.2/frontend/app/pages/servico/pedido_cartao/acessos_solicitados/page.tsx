'use client'

import { useState } from 'react'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function AcessosSolicitados() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [servicoFilter, setServicoFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const navigation = getNavigationForSection('servico', '/pages/servico/pedido_cartao/acessos_solicitados')

  const notifications = [
    {
      id: 1,
      title: 'Novo Acesso Aprovado',
      description: 'Acesso ao sistema financeiro foi aprovado',
      time: 'Há 10 minutos',
      status: 'success',
    },
  ]

  // Mock data for acessos
  const acessosData = [
    {
      id: 1,
      servico: 'Sistema Financeiro',
      acessoSolicitado: 'Consulta de Relatórios',
      observacoes: 'Acesso necessário para análise mensal de custos e receitas',
      status: 'Aprovado',
      data: '2024-01-15',
    },
    {
      id: 2,
      servico: 'Sistema RH',
      acessoSolicitado: 'Gestão de Funcionários',
      observacoes: 'Permissão para cadastro e edição de dados de colaboradores',
      status: 'Pendente',
      data: '2024-01-20',
    },
    {
      id: 3,
      servico: 'Sistema TI',
      acessoSolicitado: 'Administração de Rede',
      observacoes: 'Acesso completo para manutenção e configuração da infraestrutura',
      status: 'Rejeitado',
      data: '2024-01-18',
    },
    {
      id: 4,
      servico: 'Sistema Compras',
      acessoSolicitado: 'Aprovação de Pedidos',
      observacoes: 'Autorização para aprovar compras até €5.000',
      status: 'Aprovado',
      data: '2024-01-22',
    },
    {
      id: 5,
      servico: 'Sistema Logística',
      acessoSolicitado: 'Controle de Estoque',
      observacoes: 'Gestão de entrada e saída de materiais do armazém',
      status: 'Pendente',
      data: '2024-01-25',
    },
    {
      id: 6,
      servico: 'Sistema Qualidade',
      acessoSolicitado: 'Auditoria Interna',
      observacoes: 'Acesso para realizar auditorias e verificações de conformidade',
      status: 'Aprovado',
      data: '2024-01-12',
    },
    {
      id: 7,
      servico: 'Sistema Marketing',
      acessoSolicitado: 'Gestão de Campanhas',
      observacoes: 'Criação e monitoramento de campanhas publicitárias',
      status: 'Pendente',
      data: '2024-01-28',
    },
    {
      id: 8,
      servico: 'Sistema Vendas',
      acessoSolicitado: 'Relatórios de Performance',
      observacoes: 'Visualização de métricas e indicadores de vendas',
      status: 'Aprovado',
      data: '2024-01-10',
    },
    {
      id: 9,
      servico: 'Sistema Jurídico',
      acessoSolicitado: 'Consulta de Contratos',
      observacoes: 'Acesso para revisão e análise de documentos legais',
      status: 'Rejeitado',
      data: '2024-01-30',
    },
    {
      id: 10,
      servico: 'Sistema Projetos',
      acessoSolicitado: 'Gestão de Cronogramas',
      observacoes: 'Planejamento e acompanhamento de projetos em andamento',
      status: 'Pendente',
      data: '2024-02-01',
    },
    {
      id: 11,
      servico: 'Sistema Manutenção',
      acessoSolicitado: 'Ordens de Serviço',
      observacoes: 'Criação e gestão de ordens de manutenção preventiva e corretiva',
      status: 'Aprovado',
      data: '2024-01-08',
    },
    {
      id: 12,
      servico: 'Sistema Segurança',
      acessoSolicitado: 'Monitoramento de Acesso',
      observacoes: 'Controle e supervisão de acessos às instalações',
      status: 'Aprovado',
      data: '2024-01-14',
    },
    {
      id: 13,
      servico: 'Sistema Comunicação',
      acessoSolicitado: 'Gestão de Conteúdo',
      observacoes: 'Publicação e edição de comunicados internos',
      status: 'Pendente',
      data: '2024-02-03',
    },
    {
      id: 14,
      servico: 'Sistema Facilities',
      acessoSolicitado: 'Reserva de Salas',
      observacoes: 'Agendamento e gestão de espaços para reuniões',
      status: 'Aprovado',
      data: '2024-01-16',
    },
  ]

  // Filter data
  const filteredData = acessosData.filter(item => {
    const searchMatch = search === '' || 
      item.servico.toLowerCase().includes(search.toLowerCase()) ||
      item.acessoSolicitado.toLowerCase().includes(search.toLowerCase()) ||
      item.observacoes.toLowerCase().includes(search.toLowerCase())
    
    const servicoMatch = servicoFilter === '' || item.servico === servicoFilter
    const statusMatch = statusFilter === '' || item.status === statusFilter
    
    return searchMatch && servicoMatch && statusMatch
  })

  // Stats calculation
  const totalAcessos = acessosData.length
  const aprovados = acessosData.filter(item => item.status === 'Aprovado').length
  const pendentes = acessosData.filter(item => item.status === 'Pendente').length
  const rejeitados = acessosData.filter(item => item.status === 'Rejeitado').length

  const stats = [
    {
      name: 'Total de Acessos',
      value: totalAcessos.toString(),
      icon: BuildingOfficeIcon,
      color: 'text-blue-500'
    },
    {
      name: 'Aprovados',
      value: aprovados.toString(),
      icon: CheckCircleIcon,
      color: 'text-green-500'
    },
    {
      name: 'Pendentes',
      value: pendentes.toString(),
      icon: ClockIcon,
      color: 'text-yellow-500'
    },
    {
      name: 'Rejeitados',
      value: rejeitados.toString(),
      icon: XCircleIcon,
      color: 'text-red-500'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900'
      case 'Pendente':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900'
      case 'Rejeitado':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900'
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900'
    }
  }

  const handleNovoAcesso = () => {
    alert('Funcionalidade de novo acesso em desenvolvimento')
  }

  const handleVerDetalhes = (id: number) => {
    alert(`Ver detalhes do acesso ${id}`)
  }

  const handleEditar = (id: number) => {
    alert(`Editar acesso ${id}`)
  }

  const handleRemover = (id: number) => {
    alert(`Remover acesso ${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="ACESSOS SOLICITADOS"
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

              {/* Search and Filters */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Pesquisar acessos..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Filter Toggle */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FunnelIcon className="h-4 w-4 mr-2" />
                      Filtros
                    </button>
                  </div>

                  {/* Collapsible Filters */}
                  {showFilters && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Serviço
                        </label>
                        <select
                          value={servicoFilter}
                          onChange={(e) => setServicoFilter(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Todos os Serviços</option>
                          <option value="Sistema Financeiro">Sistema Financeiro</option>
                          <option value="Sistema RH">Sistema RH</option>
                          <option value="Sistema TI">Sistema TI</option>
                          <option value="Sistema Compras">Sistema Compras</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Status
                        </label>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Todos os Status</option>
                          <option value="Aprovado">Aprovado</option>
                          <option value="Pendente">Pendente</option>
                          <option value="Rejeitado">Rejeitado</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Acessos Solicitados ({filteredData.length})
                  </h3>
                </div>
                <div className="overflow-hidden">
                  <div className={showFilters ? "max-h-[400px] overflow-y-auto" : "max-h-[500px] overflow-y-auto"}>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Serviço
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Acesso Solicitado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Observações
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredData.map((acesso) => (
                          <tr key={acesso.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {acesso.servico}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {acesso.acessoSolicitado}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              <div className="max-w-xs truncate" title={acesso.observacoes}>
                                {acesso.observacoes}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full font-semibold text-xs ${getStatusColor(acesso.status)}`}>
                                {acesso.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              <div className="flex justify-center space-x-2">
                                <button
                                  onClick={() => handleVerDetalhes(acesso.id)}
                                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                  title="Ver detalhes"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleEditar(acesso.id)}
                                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                  title="Editar"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleRemover(acesso.id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  title="Remover"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
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