'use client'

import { useState } from 'react'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function AvaliacaoResponsavel() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [urgenciaFilter, setUrgenciaFilter] = useState('')
  const [servicoFilter, setServicoFilter] = useState('')
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [selectedPedido, setSelectedPedido] = useState<number | null>(null)
  const [motivoRejeicao, setMotivoRejeicao] = useState('')

  const navigation = getNavigationForSection('servico', '/pages/servico/pedido_cartao/avaliacao_responsavel')

  const notifications = [
    {
      id: 1,
      title: 'Novo Pedido para Avaliação',
      description: 'Pedido de acesso ao sistema financeiro aguarda aprovação',
      time: 'Há 5 minutos',
      status: 'new',
    },
  ]

  // Expanded mock data for pedidos
  const pedidosData = [
    {
      id: 1,
      solicitante: 'João Silva',
      cargo: 'Analista de Sistemas',
      departamento: 'TI',
      servico: 'Sistema Financeiro',
      acessoSolicitado: 'Consulta de Relatórios',
      justificacao: 'Necessidade de acesso para análise mensal de custos e receitas',
      urgencia: 'Alta',
      data: '2024-01-15',
      status: 'Pendente',
      prazoDecisao: '12h',
    },
    {
      id: 2,
      solicitante: 'Maria Santos',
      cargo: 'Gestora de RH',
      departamento: 'Recursos Humanos',
      servico: 'Sistema RH',
      acessoSolicitado: 'Gestão de Funcionários',
      justificacao: 'Permissão para cadastro e edição de dados de colaboradores',
      urgencia: 'Média',
      data: '2024-01-20',
      status: 'Pendente',
      prazoDecisao: '24h',
    },
    {
      id: 3,
      solicitante: 'Carlos Oliveira',
      cargo: 'Administrador de TI',
      departamento: 'TI',
      servico: 'Sistema TI',
      acessoSolicitado: 'Administração de Rede',
      justificacao: 'Acesso completo para manutenção e configuração da infraestrutura',
      urgencia: 'Alta',
      data: '2024-01-18',
      status: 'Pendente',
      prazoDecisao: '6h',
    },
    {
      id: 4,
      solicitante: 'Ana Costa',
      cargo: 'Compradora',
      departamento: 'Compras',
      servico: 'Sistema Compras',
      acessoSolicitado: 'Aprovação de Pedidos',
      justificacao: 'Autorização para aprovar compras até €5.000',
      urgencia: 'Baixa',
      data: '2024-01-22',
      status: 'Pendente',
      prazoDecisao: '48h',
    },
    {
      id: 5,
      solicitante: 'Pedro Fernandes',
      cargo: 'Contabilista',
      departamento: 'Financeiro',
      servico: 'Sistema Financeiro',
      acessoSolicitado: 'Gestão de Contas',
      justificacao: 'Acesso para gestão de contas a pagar e receber',
      urgencia: 'Média',
      data: '2024-01-25',
      status: 'Pendente',
      prazoDecisao: '24h',
    },
    {
      id: 6,
      solicitante: 'Sofia Rodrigues',
      cargo: 'Técnica de RH',
      departamento: 'Recursos Humanos',
      servico: 'Sistema RH',
      acessoSolicitado: 'Consulta de Dados',
      justificacao: 'Consulta de informações de funcionários para relatórios',
      urgencia: 'Baixa',
      data: '2024-01-28',
      status: 'Pendente',
      prazoDecisao: '72h',
    },
    {
      id: 7,
      solicitante: 'Miguel Pereira',
      cargo: 'Gestor de Projeto',
      departamento: 'TI',
      servico: 'Sistema TI',
      acessoSolicitado: 'Gestão de Projetos',
      justificacao: 'Acesso para coordenação e acompanhamento de projetos de TI',
      urgencia: 'Alta',
      data: '2024-01-30',
      status: 'Pendente',
      prazoDecisao: '8h',
    },
    {
      id: 8,
      solicitante: 'Catarina Lopes',
      cargo: 'Assistente Administrativa',
      departamento: 'Administração',
      servico: 'Sistema Administrativo',
      acessoSolicitado: 'Gestão de Documentos',
      justificacao: 'Acesso para arquivo e gestão de documentação administrativa',
      urgencia: 'Média',
      data: '2024-02-01',
      status: 'Pendente',
      prazoDecisao: '36h',
    },
    {
      id: 9,
      solicitante: 'Ricardo Martins',
      cargo: 'Analista Financeiro',
      departamento: 'Financeiro',
      servico: 'Sistema Financeiro',
      acessoSolicitado: 'Análise de Dados',
      justificacao: 'Acesso para análise de indicadores financeiros e relatórios',
      urgencia: 'Alta',
      data: '2024-02-03',
      status: 'Pendente',
      prazoDecisao: '12h',
    },
    {
      id: 10,
      solicitante: 'Teresa Silva',
      cargo: 'Coordenadora de Compras',
      departamento: 'Compras',
      servico: 'Sistema Compras',
      acessoSolicitado: 'Coordenação de Compras',
      justificacao: 'Supervisão e coordenação de todo o processo de compras',
      urgencia: 'Média',
      data: '2024-02-05',
      status: 'Pendente',
      prazoDecisao: '24h',
    },
    {
      id: 11,
      solicitante: 'Bruno Costa',
      cargo: 'Técnico de TI',
      departamento: 'TI',
      servico: 'Sistema TI',
      acessoSolicitado: 'Suporte Técnico',
      justificacao: 'Acesso para prestação de suporte técnico aos utilizadores',
      urgencia: 'Baixa',
      data: '2024-02-07',
      status: 'Pendente',
      prazoDecisao: '48h',
    },
    {
      id: 12,
      solicitante: 'Inês Fernandes',
      cargo: 'Especialista em RH',
      departamento: 'Recursos Humanos',
      servico: 'Sistema RH',
      acessoSolicitado: 'Gestão de Formação',
      justificacao: 'Gestão de planos de formação e desenvolvimento de competências',
      urgencia: 'Média',
      data: '2024-02-10',
      status: 'Pendente',
      prazoDecisao: '36h',
    },
    {
      id: 13,
      solicitante: 'Luís Soares',
      cargo: 'Auditor Interno',
      departamento: 'Auditoria',
      servico: 'Sistema Auditoria',
      acessoSolicitado: 'Auditoria Completa',
      justificacao: 'Acesso completo para realização de auditorias internas',
      urgencia: 'Alta',
      data: '2024-02-12',
      status: 'Pendente',
      prazoDecisao: '6h',
    },
    {
      id: 14,
      solicitante: 'Patrícia Alves',
      cargo: 'Gestora de Qualidade',
      departamento: 'Qualidade',
      servico: 'Sistema Qualidade',
      acessoSolicitado: 'Gestão de Processos',
      justificacao: 'Monitorização e gestão de processos de qualidade',
      urgencia: 'Média',
      data: '2024-02-14',
      status: 'Pendente',
      prazoDecisao: '24h',
    },
    {
      id: 15,
      solicitante: 'Rui Carvalho',
      cargo: 'Diretor Comercial',
      departamento: 'Comercial',
      servico: 'Sistema Comercial',
      acessoSolicitado: 'Gestão Comercial',
      justificacao: 'Supervisão de atividades comerciais e vendas',
      urgencia: 'Alta',
      data: '2024-02-16',
      status: 'Pendente',
      prazoDecisao: '8h',
    },
    {
      id: 16,
      solicitante: 'Helena Dias',
      cargo: 'Assistente de Direção',
      departamento: 'Direção',
      servico: 'Sistema Executivo',
      acessoSolicitado: 'Apoio à Direção',
      justificacao: 'Suporte administrativo à direção executiva',
      urgencia: 'Baixa',
      data: '2024-02-18',
      status: 'Pendente',
      prazoDecisao: '72h',
    },
    {
      id: 17,
      solicitante: 'João Ferreira',
      cargo: 'Engenheiro de Software',
      departamento: 'TI',
      servico: 'Sistema TI',
      acessoSolicitado: 'Desenvolvimento',
      justificacao: 'Acesso para desenvolvimento e manutenção de aplicações',
      urgencia: 'Média',
      data: '2024-02-20',
      status: 'Pendente',
      prazoDecisao: '24h',
    },
    {
      id: 18,
      solicitante: 'Mariana Gomes',
      cargo: 'Analista de Marketing',
      departamento: 'Marketing',
      servico: 'Sistema Marketing',
      acessoSolicitado: 'Análise de Campanhas',
      justificacao: 'Análise de performance de campanhas de marketing',
      urgencia: 'Baixa',
      data: '2024-02-22',
      status: 'Pendente',
      prazoDecisao: '48h',
    },
    {
      id: 19,
      solicitante: 'André Ribeiro',
      cargo: 'Responsável de Logística',
      departamento: 'Logística',
      servico: 'Sistema Logística',
      acessoSolicitado: 'Gestão de Stocks',
      justificacao: 'Controlo e gestão de inventário e stocks',
      urgencia: 'Alta',
      data: '2024-02-24',
      status: 'Pendente',
      prazoDecisao: '12h',
    },
    {
      id: 20,
      solicitante: 'Cristina Moura',
      cargo: 'Secretária Executiva',
      departamento: 'Administração',
      servico: 'Sistema Administrativo',
      acessoSolicitado: 'Secretariado',
      justificacao: 'Gestão de agenda e correspondência executiva',
      urgencia: 'Média',
      data: '2024-02-26',
      status: 'Pendente',
      prazoDecisao: '36h',
    },
  ]

  // Filter data
  const filteredData = pedidosData.filter(item => {
    const searchMatch = search === '' || 
      item.solicitante.toLowerCase().includes(search.toLowerCase()) ||
      item.servico.toLowerCase().includes(search.toLowerCase()) ||
      item.acessoSolicitado.toLowerCase().includes(search.toLowerCase()) ||
      item.departamento.toLowerCase().includes(search.toLowerCase())
    
    const urgenciaMatch = urgenciaFilter === '' || item.urgencia === urgenciaFilter
    const servicoMatch = servicoFilter === '' || item.servico === servicoFilter
    
    return searchMatch && urgenciaMatch && servicoMatch
  })

  // Stats calculation
  const totalPedidos = pedidosData.length
  const pendentes = pedidosData.filter(item => item.status === 'Pendente').length
  const urgentes = pedidosData.filter(item => item.urgencia === 'Alta').length
  const prazoVencendo = pedidosData.filter(item => item.prazoDecisao === '6h' || item.prazoDecisao === '8h' || item.prazoDecisao === '12h').length

  const stats = [
    {
      name: 'Total de Pedidos',
      value: totalPedidos.toString(),
      icon: BuildingOfficeIcon,
      color: 'text-blue-500'
    },
    {
      name: 'Pendentes',
      value: pendentes.toString(),
      icon: ClockIcon,
      color: 'text-yellow-500'
    },
    {
      name: 'Urgentes',
      value: urgentes.toString(),
      icon: ExclamationTriangleIcon,
      color: 'text-red-500'
    },
    {
      name: 'Prazo Vencendo',
      value: prazoVencendo.toString(),
      icon: ClockIcon,
      color: 'text-orange-500'
    },
  ]

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case 'Alta':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
      case 'Média':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
      case 'Baixa':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    }
  }

  const handleAceitar = (id: number) => {
    alert(`Pedido ${id} aceito com sucesso!`)
  }

  const handleRecusar = (id: number) => {
    setSelectedPedido(id)
    setShowRejectModal(true)
  }

  const handleConfirmReject = () => {
    if (!motivoRejeicao.trim()) {
      alert('Por favor, indique o motivo da rejeição.')
      return
    }
    alert(`Pedido ${selectedPedido} rejeitado. Motivo: ${motivoRejeicao}`)
    setShowRejectModal(false)
    setSelectedPedido(null)
    setMotivoRejeicao('')
  }

  const handleCancelReject = () => {
    setShowRejectModal(false)
    setSelectedPedido(null)
    setMotivoRejeicao('')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="AVALIAÇÃO DO RESPONSÁVEL"
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

              {/* Search and Filters - Updated to match dashboard style */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    {/* First row - Search and filter button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Pesquisar por Solicitante, Serviço, Acesso ou Departamento"
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
                      </div>
                    </div>
                    
                    {/* Second row - Filters (conditionally visible) */}
                    {showFilters && (
                      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="sm:w-48">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Urgência
                          </label>
                          <select
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            value={urgenciaFilter}
                            onChange={(e) => setUrgenciaFilter(e.target.value)}
                          >
                            <option value="">Todas as Urgências</option>
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                          </select>
                        </div>
                        
                        <div className="sm:w-48">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Serviço
                          </label>
                          <select
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            value={servicoFilter}
                            onChange={(e) => setServicoFilter(e.target.value)}
                          >
                            <option value="">Todos os Serviços</option>
                            <option value="Sistema Financeiro">Sistema Financeiro</option>
                            <option value="Sistema RH">Sistema RH</option>
                            <option value="Sistema TI">Sistema TI</option>
                            <option value="Sistema Compras">Sistema Compras</option>
                            <option value="Sistema Administrativo">Sistema Administrativo</option>
                            <option value="Sistema Auditoria">Sistema Auditoria</option>
                            <option value="Sistema Qualidade">Sistema Qualidade</option>
                            <option value="Sistema Comercial">Sistema Comercial</option>
                            <option value="Sistema Executivo">Sistema Executivo</option>
                            <option value="Sistema Marketing">Sistema Marketing</option>
                            <option value="Sistema Logística">Sistema Logística</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Table - Updated height calculation */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Pedidos para Avaliação ({filteredData.length})
                  </h3>
                </div>
                <div className="overflow-hidden">
                  <div className={showFilters ? "max-h-[400px] overflow-y-auto" : "max-h-[500px] overflow-y-auto"}>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Solicitante
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Serviço
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Acesso Solicitado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Urgência
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Prazo
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredData.map((pedido) => (
                          <tr key={pedido.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <UserCircleIcon className="h-8 w-8 text-gray-400 mr-3" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {pedido.solicitante}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {pedido.cargo} - {pedido.departamento}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {pedido.servico}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              <div className="max-w-xs truncate" title={pedido.justificacao}>
                                {pedido.acessoSolicitado}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full font-semibold text-xs ${getUrgenciaColor(pedido.urgencia)}`}>
                                {pedido.urgencia}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {pedido.prazoDecisao}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleAceitar(pedido.id)}
                                  className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 hover:bg-green-200 transition text-xs"
                                  title="Aceitar"
                                  type="button"
                                >
                                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                                  Aceitar
                                </button>
                                <button
                                  onClick={() => handleRecusar(pedido.id)}
                                  className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 transition text-xs"
                                  title="Recusar"
                                  type="button"
                                >
                                  <XCircleIcon className="h-4 w-4 mr-1" />
                                  Recusar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {filteredData.length === 0 && (
                      <div className="text-center text-gray-500 dark:text-gray-300 py-8">
                        Nenhum pedido encontrado.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-blurred bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center backdrop-blur-sm animate-fadeIn">
          <div className="relative p-5 border w-96 shadow-2xl rounded-lg bg-white dark:bg-gray-800 transform transition-all duration-500 ease-out animate-slideInUp">
            <div className="mt-3">
              <div className="flex items-center justify-center mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 animate-bounce">
                <XCircleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Rejeitar Pedido
                </h3>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                    Motivo da rejeição:
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 focus:scale-105"
                    rows={4}
                    placeholder="Descreva o motivo da rejeição..."
                    value={motivoRejeicao}
                    onChange={(e) => setMotivoRejeicao(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleConfirmReject}
                    className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                  >
                    Confirmar Rejeição
                  </button>
                  <button
                    onClick={handleCancelReject}
                    className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <NotificationsPanel
        isOpen={notificationsOpen}
        setIsOpen={setNotificationsOpen}
        notifications={notifications}
      />
    </div>
  )
}