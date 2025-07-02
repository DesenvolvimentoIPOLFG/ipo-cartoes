'use client'

import { useState } from 'react'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import Sidebar from '@/app/components/navigation/Sidebar'
import Navbar from '@/app/components/navigation/Navbar'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import { getNavigationForSection } from '@/app/config/navigation'

export default function HistoricoPedidos() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [urgenciaFilter, setUrgenciaFilter] = useState('')
  const [servicoFilter, setServicoFilter] = useState('')
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showTimelineModal, setShowTimelineModal] = useState(false)
  const [selectedPedido, setSelectedPedido] = useState<any>(null)

  const navigation = getNavigationForSection('servico', '/pages/servico/pedido_cartao/historico')

  const notifications = [
    {
      id: 1,
      title: 'Histórico Atualizado',
      description: 'Novos registros foram adicionados ao histórico',
      time: 'Há 10 minutos',
      status: 'info',
    },
  ]

  // Enhanced mock data with status and timeline
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
      status: 'Aprovado',
      prazoDecisao: '12h',
      dataDecisao: '2024-01-15',
      responsavel: 'Maria Santos',
      observacoes: 'Aprovado com restrições de horário',
      timeline: [
        {
          id: 1,
          evento: 'Pedido Criado',
          data: '2024-01-15 09:00',
          responsavel: 'João Silva',
          descricao: 'Pedido de acesso criado pelo solicitante',
          status: 'info'
        },
        {
          id: 2,
          evento: 'Em Análise',
          data: '2024-01-15 10:30',
          responsavel: 'Sistema',
          descricao: 'Pedido encaminhado para análise do responsável',
          status: 'warning'
        },
        {
          id: 3,
          evento: 'Aprovado',
          data: '2024-01-15 15:45',
          responsavel: 'Maria Santos',
          descricao: 'Pedido aprovado com restrições de horário',
          status: 'success'
        }
      ]
    },
    {
      id: 2,
      solicitante: 'Ricardo Bernardo',
      cargo: 'Gestor de Projetos',
      departamento: 'Operações',
      servico: 'Sistema de Gestão',
      acessoSolicitado: 'Gestão de Projetos',
      justificacao: 'Necessidade de acesso para acompanhamento de projetos em andamento',
      urgencia: 'Média',
      data: '2024-01-20',
      status: 'Rejeitado',
      prazoDecisao: '24h',
      dataDecisao: '2024-01-21',
      responsavel: 'Carlos Oliveira',
      observacoes: 'Falta de justificação adequada',
      timeline: [
        {
          id: 1,
          evento: 'Pedido Criado',
          data: '2024-01-20 14:20',
          responsavel: 'Ricardo Bernardo',
          descricao: 'Pedido de acesso criado pelo solicitante',
          status: 'info'
        },
        {
          id: 2,
          evento: 'Em Análise',
          data: '2024-01-20 16:00',
          responsavel: 'Sistema',
          descricao: 'Pedido encaminhado para análise do responsável',
          status: 'warning'
        },
        {
          id: 3,
          evento: 'Solicitação de Esclarecimentos',
          data: '2024-01-21 09:15',
          responsavel: 'Carlos Oliveira',
          descricao: 'Solicitados esclarecimentos sobre a justificação',
          status: 'warning'
        },
        {
          id: 4,
          evento: 'Rejeitado',
          data: '2024-01-21 11:30',
          responsavel: 'Carlos Oliveira',
          descricao: 'Pedido rejeitado por falta de justificação adequada',
          status: 'error'
        }
      ]
    },
    {
      id: 3,
      solicitante: 'Miguel Fernandes',
      cargo: 'Estudante',
      departamento: 'Limpeza',
      servico: 'Sistema Administrativo',
      acessoSolicitado: 'Acesso Básico',
      justificacao: 'Necessidade de acesso para atividades de limpeza',
      urgencia: 'Baixa',
      data: '2024-01-25',
      status: 'Aprovado',
      prazoDecisao: '48h',
      dataDecisao: '2024-01-27',
      responsavel: 'Ana Costa',
      observacoes: 'Aprovado para acesso limitado',
      timeline: [
        {
          id: 1,
          evento: 'Pedido Criado',
          data: '2024-01-25 08:45',
          responsavel: 'Miguel Fernandes',
          descricao: 'Pedido de acesso criado pelo solicitante',
          status: 'info'
        },
        {
          id: 2,
          evento: 'Aprovado',
          data: '2024-01-27 16:20',
          responsavel: 'Ana Costa',
          descricao: 'Pedido aprovado para acesso limitado',
          status: 'success'
        }
      ]
    },
    {
      id: 4,
      solicitante: 'Ana Martins',
      cargo: 'Recursos Humanos',
      departamento: 'RH',
      servico: 'Sistema RH',
      acessoSolicitado: 'Gestão de Funcionários',
      justificacao: 'Gestão de férias e contratos',
      urgencia: 'Média',
      data: '2024-02-01',
      status: 'Aprovado',
      prazoDecisao: '24h',
      dataDecisao: '2024-02-02',
      responsavel: 'Pedro Silva',
      observacoes: 'Aprovado com acesso total',
      timeline: [
        {
          id: 1,
          evento: 'Pedido Criado',
          data: '2024-02-01 11:30',
          responsavel: 'Ana Martins',
          descricao: 'Pedido de acesso criado pelo solicitante',
          status: 'info'
        },
        {
          id: 2,
          evento: 'Aprovado',
          data: '2024-02-02 13:15',
          responsavel: 'Pedro Silva',
          descricao: 'Pedido aprovado com acesso total',
          status: 'success'
        }
      ]
    },
    {
      id: 5,
      solicitante: 'Carlos Sousa',
      cargo: 'Financeiro',
      departamento: 'Financeiro',
      servico: 'Sistema Financeiro',
      acessoSolicitado: 'Gestão Financeira',
      justificacao: 'Fecho mensal de contas',
      urgencia: 'Alta',
      data: '2024-02-05',
      status: 'Aprovado',
      prazoDecisao: '6h',
      dataDecisao: '2024-02-05',
      responsavel: 'Sofia Rodrigues',
      observacoes: 'Aprovação urgente concedida',
      timeline: [
        {
          id: 1,
          evento: 'Pedido Criado',
          data: '2024-02-05 08:00',
          responsavel: 'Carlos Sousa',
          descricao: 'Pedido urgente de acesso criado',
          status: 'info'
        },
        {
          id: 2,
          evento: 'Prioridade Alta',
          data: '2024-02-05 08:15',
          responsavel: 'Sistema',
          descricao: 'Pedido marcado como alta prioridade',
          status: 'warning'
        },
        {
          id: 3,
          evento: 'Aprovado',
          data: '2024-02-05 14:00',
          responsavel: 'Sofia Rodrigues',
          descricao: 'Aprovação urgente concedida',
          status: 'success'
        }
      ]
    },
    {
      id: 6,
      solicitante: 'Beatriz Lopes',
      cargo: 'Marketing',
      departamento: 'Marketing',
      servico: 'Sistema Marketing',
      acessoSolicitado: 'Análise de Campanhas',
      justificacao: 'Análise de campanhas digitais',
      urgencia: 'Baixa',
      data: '2024-02-10',
      status: 'Rejeitado',
      prazoDecisao: '48h',
      dataDecisao: '2024-02-12',
      responsavel: 'Miguel Pereira',
      observacoes: 'Acesso desnecessário para a função',
      timeline: [
        {
          id: 1,
          evento: 'Pedido Criado',
          data: '2024-02-10 10:30',
          responsavel: 'Beatriz Lopes',
          descricao: 'Pedido de acesso criado pelo solicitante',
          status: 'info'
        },
        {
          id: 2,
          evento: 'Rejeitado',
          data: '2024-02-12 15:45',
          responsavel: 'Miguel Pereira',
          descricao: 'Pedido rejeitado - acesso desnecessário para a função',
          status: 'error'
        }
      ]
    },
    {
      id: 7,
      solicitante: 'Pedro Almeida',
      cargo: 'Engenheiro',
      departamento: 'Engenharia',
      servico: 'Sistema TI',
      acessoSolicitado: 'Desenvolvimento',
      justificacao: 'Desenvolvimento de novos projetos',
      urgencia: 'Média',
      data: '2024-02-15',
      status: 'Aprovado',
      prazoDecisao: '24h',
      dataDecisao: '2024-02-16',
      responsavel: 'Teresa Silva',
      observacoes: 'Aprovado para projetos específicos',
      timeline: [
        {
          id: 1,
          evento: 'Pedido Criado',
          data: '2024-02-15 09:20',
          responsavel: 'Pedro Almeida',
          descricao: 'Pedido de acesso criado pelo solicitante',
          status: 'info'
        },
        {
          id: 2,
          evento: 'Aprovado',
          data: '2024-02-16 12:30',
          responsavel: 'Teresa Silva',
          descricao: 'Pedido aprovado para projetos específicos',
          status: 'success'
        }
      ]
    },
    {
      id: 8,
      solicitante: 'Sofia Ribeiro',
      cargo: 'Jurídico',
      departamento: 'Jurídico',
      servico: 'Sistema Jurídico',
      acessoSolicitado: 'Gestão de Contratos',
      justificacao: 'Revisão de contratos de fornecedores',
      urgencia: 'Alta',
      data: '2024-02-20',
      status: 'Aprovado',
      prazoDecisao: '12h',
      dataDecisao: '2024-02-20',
      responsavel: 'Bruno Costa',
      observacoes: 'Acesso temporário de 7 dias',
      timeline: [
        {
          id: 1,
          evento: 'Pedido Criado',
          data: '2024-02-20 07:45',
          responsavel: 'Sofia Ribeiro',
          descricao: 'Pedido de acesso criado pelo solicitante',
          status: 'info'
        },
        {
          id: 2,
          evento: 'Aprovado',
          data: '2024-02-20 19:30',
          responsavel: 'Bruno Costa',
          descricao: 'Pedido aprovado - acesso temporário de 7 dias',
          status: 'success'
        }
      ]
    },
  ]

  // Filter data
  const filteredData = pedidosData.filter(item => {
    const searchMatch = search === '' || 
      item.solicitante.toLowerCase().includes(search.toLowerCase()) ||
      item.servico.toLowerCase().includes(search.toLowerCase()) ||
      item.acessoSolicitado.toLowerCase().includes(search.toLowerCase()) ||
      item.departamento.toLowerCase().includes(search.toLowerCase())
    
    const statusMatch = statusFilter === '' || item.status === statusFilter
    const urgenciaMatch = urgenciaFilter === '' || item.urgencia === urgenciaFilter
    const servicoMatch = servicoFilter === '' || item.servico === servicoFilter
    
    return searchMatch && statusMatch && urgenciaMatch && servicoMatch
  })

  // Stats calculation
  const totalPedidos = pedidosData.length
  const aprovados = pedidosData.filter(item => item.status === 'Aprovado').length
  const rejeitados = pedidosData.filter(item => item.status === 'Rejeitado').length
  const urgentes = pedidosData.filter(item => item.urgencia === 'Alta').length

  const stats = [
    {
      name: 'Total de Pedidos',
      value: totalPedidos.toString(),
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
      name: 'Rejeitados',
      value: rejeitados.toString(),
      icon: XCircleIcon,
      color: 'text-red-500'
    },
    {
      name: 'Urgentes',
      value: urgentes.toString(),
      icon: ExclamationTriangleIcon,
      color: 'text-orange-500'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
      case 'Rejeitado':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    }
  }

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

  const handleViewDetails = (pedido: any) => {
    // Close timeline modal first if it's open
    if (showTimelineModal) {
      setShowTimelineModal(false)
      // Small delay to allow timeline modal to close before opening details
      setTimeout(() => {
        setSelectedPedido(pedido)
        setShowDetailsModal(true)
      }, 150)
    } else {
      setSelectedPedido(pedido)
      setShowDetailsModal(true)
    }
  }

  const handleRowDoubleClick = (pedido: any) => {
    // Close details modal first if it's open
    if (showDetailsModal) {
      setShowDetailsModal(false)
      // Small delay to allow details modal to close before opening timeline
      setTimeout(() => {
        setSelectedPedido(pedido)
        setShowTimelineModal(true)
      }, 150)
    } else {
      setSelectedPedido(pedido)
      setShowTimelineModal(true)
    }
  }

  const handleCloseModal = () => {
    setShowDetailsModal(false)
    setSelectedPedido(null)
  }

  const handleCloseTimelineModal = () => {
    setShowTimelineModal(false)
    setSelectedPedido(null)
  }

  // New handler for switching from timeline to details
  const handleSwitchToDetails = (pedido: any) => {
    setShowTimelineModal(false)
    setTimeout(() => {
      setSelectedPedido(pedido)
      setShowDetailsModal(true)
    }, 150)
  }

  const getTimelineStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-600" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
      case 'info':
      default:
        return <ClockIcon className="h-5 w-5 text-blue-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1 h-screen">
        <Navbar
          title="HISTÓRICO DE PEDIDOS"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1 overflow-y-auto scrollbar-hide">
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
                            Status
                          </label>
                          <select
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                          >
                            <option value="">Todos os Status</option>
                            <option value="Aprovado">Aprovado</option>
                            <option value="Rejeitado">Rejeitado</option>
                          </select>
                        </div>
                        
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
                            <option value="Sistema de Gestão">Sistema de Gestão</option>
                            <option value="Sistema Administrativo">Sistema Administrativo</option>
                            <option value="Sistema Marketing">Sistema Marketing</option>
                            <option value="Sistema Jurídico">Sistema Jurídico</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Histórico de Pedidos ({filteredData.length})
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Duplo clique numa linha para ver o histórico detalhado
                  </p>
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
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Data
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredData.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                              Nenhum pedido encontrado
                            </td>
                          </tr>
                        ) : (
                          filteredData.map((pedido) => (
                            <tr 
                              key={pedido.id} 
                              className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                              onDoubleClick={() => handleRowDoubleClick(pedido)}
                              title="Duplo clique para ver o histórico"
                            >
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
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full font-semibold text-xs ${getStatusColor(pedido.status)}`}>
                                  {pedido.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {pedido.data}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <button
                                  onClick={() => handleViewDetails(pedido)}
                                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                                >
                                  <EyeIcon className="h-5 w-5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
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

      {/* Details Modal */}
      {showDetailsModal && selectedPedido && (
        <div 
          className="fixed inset-0 bg-blurred bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 detailsModal"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto detailsContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center detailsModalHeader">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white detailsTitle">
                Detalhes do Pedido #{selectedPedido.id}
              </h3>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-all duration-150 hover:scale-105 active:scale-95"
              >
                Fechar
              </button>
            </div>
            
            <div className="p-6 space-y-4 detailsModalContent">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="detailsModalField" style={{animationDelay: '200ms'}}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Solicitante
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPedido.solicitante}</p>
                </div>
                <div className="detailsModalField" style={{animationDelay: '250ms'}}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cargo
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPedido.cargo}</p>
                </div>
                <div className="detailsModalField" style={{animationDelay: '300ms'}}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Departamento
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPedido.departamento}</p>
                </div>
                <div className="detailsModalField" style={{animationDelay: '350ms'}}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Serviço
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPedido.servico}</p>
                </div>
                <div className="detailsModalField" style={{animationDelay: '400ms'}}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Acesso Solicitado
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPedido.acessoSolicitado}</p>
                </div>
                <div className="detailsModalField" style={{animationDelay: '450ms'}}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Urgência
                  </label>
                  <span className={`mt-1 inline-flex items-center px-2 py-1 rounded-full font-semibold text-xs ${getUrgenciaColor(selectedPedido.urgencia)}`}>
                    {selectedPedido.urgencia}
                  </span>
                </div>
                <div className="detailsModalField" style={{animationDelay: '500ms'}}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <span className={`mt-1 inline-flex items-center px-2 py-1 rounded-full font-semibold text-xs ${getStatusColor(selectedPedido.status)}`}>
                    {selectedPedido.status}
                  </span>
                </div>
                <div className="detailsModalField" style={{animationDelay: '550ms'}}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Data do Pedido
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPedido.data}</p>
                </div>
              </div>
              
              <div className="detailsModalField" style={{animationDelay: '600ms'}}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Justificação
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPedido.justificacao}</p>
              </div>
              
              <div className="detailsModalField" style={{animationDelay: '650ms'}}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Observações
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPedido.observacoes}</p>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end detailsModalFooter">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    setTimeout(() => {
                      setSelectedPedido(selectedPedido)
                      setShowTimelineModal(true)
                    }, 150)
                  }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-150 hover:scale-105 active:scale-95"
                >
                  Ver Timeline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Modal */}
      {showTimelineModal && selectedPedido && (
        <div 
          className="fixed inset-0 bg-blurred bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 timelineModal"
          onClick={handleCloseTimelineModal}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto timelineContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white timelineTitle">
                  Histórico do Pedido #{selectedPedido.id}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedPedido.solicitante} - {selectedPedido.servico}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-all duration-150 hover:scale-105 active:scale-95"
              >
                Fechar
              </button>
            </div>
            
            <div className="p-6">
              {/* Request Summary */}
              <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                  Resumo do Pedido
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Solicitante:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedPedido.solicitante}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Serviço:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedPedido.servico}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Acesso:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedPedido.acessoSolicitado}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                    <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full font-semibold text-xs ${getStatusColor(selectedPedido.status)}`}>
                      {selectedPedido.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-6">
                  Linha do Tempo
                </h4>
                
                <div className="space-y-6">
                  {selectedPedido.timeline?.map((evento: any, index: number) => (
                    <div key={evento.id} className="relative flex items-start timelineEvent" style={{animationDelay: `${index * 100}ms`}}>
                      {/* Timeline line */}
                      {index !== selectedPedido.timeline.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200 dark:bg-gray-600"></div>
                      )}
                      
                      {/* Timeline icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getTimelineStatusColor(evento.status)} timelineIcon`}>
                        {getTimelineIcon(evento.status)}
                      </div>
                      
                      {/* Timeline content */}
                      <div className="ml-4 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                            {evento.evento}
                          </h5>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {evento.data}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {evento.descricao}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Por: {evento.responsavel}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowTimelineModal(false)
                    setShowDetailsModal(true)
                  }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-150 hover:scale-105 active:scale-95"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}