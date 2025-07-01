'use client'

import React, { Fragment, useState } from 'react'
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  IdentificationIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function GerirCartao() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [showFilters, setShowFilters] = useState(false)

  const notifications = [
    {
      id: 1,
      title: 'Cartão Expirado',
      description: 'O cartão de João Silva expira hoje',
      time: 'Há 5 minutos',
      status: 'warning',
    },
    {
      id: 2,
      title: 'Cartão Desativado',
      description: 'Cartão de Maria Santos foi desativado por segurança',
      time: 'Há 30 minutos',
      status: 'new',
    },
    {
      id: 3,
      title: 'Renovação Automática',
      description: '5 cartões foram renovados automaticamente',
      time: 'Há 2 horas',
      status: 'success',
    },
    {
      id: 4,
      title: 'Acesso Negado',
      description: 'Tentativa de acesso não autorizado detectada',
      time: 'Há 4 horas',
      status: 'warning',
    },
  ]
  
  // Use centralized navigation and add subItems for this specific page
  const baseNavigation = getNavigationForSection('rh', '/pages/rh/gerir_cartao')
  const navigation = baseNavigation.map(item => {
    if (item.name === 'Gerir Cartão') {
      return {
        ...item,
        subItems: [
          { name: 'Dados do Colaborador', href: '/pages/rh/gerir_cartao/dados_colaborador', current: false },
          { name: 'Cartão', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao', current: false },
          { name: 'Ações', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao/acoes', current: false }
        ]
      }
    }
    return item
  })

  const stats = [
    { name: 'Cartões Ativos', value: '245', icon: CheckCircleIcon, color: 'text-green-500' },
    { name: 'Cartões Inativos', value: '18', icon: XCircleIcon, color: 'text-red-500' },
    { name: 'Expirando em 30 dias', value: '12', icon: ClockIcon, color: 'text-yellow-500' },
    { name: 'Bloqueados', value: '5', icon: ExclamationTriangleIcon, color: 'text-orange-500' },
  ]

  const cartoes = [
    {
      id: 1,
      numeroCartao: '****1234',
      nomePortador: 'Ana Costa',
      numeroFuncionario: '12345',
      departamento: 'Recursos Humanos',
      tipo: 'Profissional',
      status: 'ativo',
      dataEmissao: '2024-01-15',
      dataExpiracao: '2026-01-15',
      ultimoAcesso: '2024-01-20 14:30',
      observacoes: 'Cartão principal'
    },
    {
      id: 2,
      numeroCartao: '****5678',
      nomePortador: 'Carlos Silva',
      numeroFuncionario: '67890',
      departamento: 'Tecnologia',
      tipo: 'Profissional',
      status: 'inativo',
      dataEmissao: '2023-06-10',
      dataExpiracao: '2025-06-10',
      ultimoAcesso: '2024-01-18 09:15',
      observacoes: 'Desativado por pedido do utilizador'
    },
    {
      id: 3,
      numeroCartao: '****9012',
      nomePortador: 'Maria Santos',
      numeroFuncionario: '11111',
      departamento: 'Financeiro',
      tipo: 'Prestador',
      status: 'bloqueado',
      dataEmissao: '2023-12-01',
      dataExpiracao: '2025-12-01',
      ultimoAcesso: '2024-01-19 16:45',
      observacoes: 'Bloqueado por tentativas de acesso suspeitas'
    },
    {
      id: 4,
      numeroCartao: '****3456',
      nomePortador: 'João Oliveira',
      numeroFuncionario: '22222',
      departamento: 'Operações',
      tipo: 'Profissional',
      status: 'expirando',
      dataEmissao: '2022-02-01',
      dataExpiracao: '2024-02-01',
      ultimoAcesso: '2024-01-21 11:20',
      observacoes: 'Renovação necessária'
    },
    {
      id: 5,
      numeroCartao: '****7890',
      nomePortador: 'Sofia Pereira',
      numeroFuncionario: '33333',
      departamento: 'Marketing',
      tipo: 'Profissional',
      status: 'ativo',
      dataEmissao: '2023-08-15',
      dataExpiracao: '2025-08-15',
      ultimoAcesso: '2024-01-21 13:10',
      observacoes: 'Acesso regular'
    },
    {
      id: 6,
      numeroCartao: '****2468',
      nomePortador: 'Pedro Fernandes',
      numeroFuncionario: '44444',
      departamento: 'Vendas',
      tipo: 'Profissional',
      status: 'ativo',
      dataEmissao: '2023-09-20',
      dataExpiracao: '2025-09-20',
      ultimoAcesso: '2024-01-21 10:45',
      observacoes: 'Cartão de vendas'
    },
    {
      id: 7,
      numeroCartao: '****1357',
      nomePortador: 'Catarina Lopes',
      numeroFuncionario: '55555',
      departamento: 'Qualidade',
      tipo: 'Prestador',
      status: 'ativo',
      dataEmissao: '2023-11-05',
      dataExpiracao: '2025-11-05',
      ultimoAcesso: '2024-01-20 16:20',
      observacoes: 'Acesso a laboratórios'
    },
    {
      id: 8,
      numeroCartao: '****9753',
      nomePortador: 'Ricardo Martins',
      numeroFuncionario: '66666',
      departamento: 'Logística',
      tipo: 'Profissional',
      status: 'inativo',
      dataEmissao: '2023-04-12',
      dataExpiracao: '2025-04-12',
      ultimoAcesso: '2024-01-15 08:30',
      observacoes: 'Transferido de departamento'
    },
    {
      id: 9,
      numeroCartao: '****8642',
      nomePortador: 'Inês Carvalho',
      numeroFuncionario: '77777',
      departamento: 'Contabilidade',
      tipo: 'Profissional',
      status: 'ativo',
      dataEmissao: '2023-07-18',
      dataExpiracao: '2025-07-18',
      ultimoAcesso: '2024-01-21 14:15',
      observacoes: 'Acesso financeiro'
    },
    {
      id: 10,
      numeroCartao: '****5791',
      nomePortador: 'Miguel Sousa',
      numeroFuncionario: '88888',
      departamento: 'Produção',
      tipo: 'Profissional',
      status: 'bloqueado',
      dataEmissao: '2023-03-25',
      dataExpiracao: '2025-03-25',
      ultimoAcesso: '2024-01-19 12:00',
      observacoes: 'Incidente de segurança'
    },
    {
      id: 11,
      numeroCartao: '****4826',
      nomePortador: 'Beatriz Almeida',
      numeroFuncionario: '99999',
      departamento: 'Comunicação',
      tipo: 'Prestador',
      status: 'ativo',
      dataEmissao: '2023-10-08',
      dataExpiracao: '2025-10-08',
      ultimoAcesso: '2024-01-21 09:45',
      observacoes: 'Acesso a estúdios'
    },
    {
      id: 12,
      numeroCartao: '****3715',
      nomePortador: 'Tiago Pereira',
      numeroFuncionario: '10101',
      departamento: 'Segurança',
      tipo: 'Profissional',
      status: 'ativo',
      dataEmissao: '2023-12-15',
      dataExpiracao: '2025-12-15',
      ultimoAcesso: '2024-01-21 15:30',
      observacoes: 'Acesso total'
    },
    {
      id: 13,
      numeroCartao: '****6048',
      nomePortador: 'Lúcia Santos',
      numeroFuncionario: '12121',
      departamento: 'Administração',
      tipo: 'Profissional',
      status: 'expirando',
      dataEmissao: '2022-03-10',
      dataExpiracao: '2024-03-10',
      ultimoAcesso: '2024-01-20 11:15',
      observacoes: 'Renovação pendente'
    },
    {
      id: 14,
      numeroCartao: '****9371',
      nomePortador: 'André Ribeiro',
      numeroFuncionario: '13131',
      departamento: 'Manutenção',
      tipo: 'Prestador',
      status: 'inativo',
      dataEmissao: '2023-05-22',
      dataExpiracao: '2025-05-22',
      ultimoAcesso: '2024-01-16 07:45',
      observacoes: 'Contrato suspenso'
    },
    {
      id: 15,
      numeroCartao: '****2604',
      nomePortador: 'Carla Nunes',
      numeroFuncionario: '14141',
      departamento: 'Compras',
      tipo: 'Profissional',
      status: 'ativo',
      dataEmissao: '2023-08-30',
      dataExpiracao: '2025-08-30',
      ultimoAcesso: '2024-01-21 13:45',
      observacoes: 'Acesso a fornecedores'
    },
    {
      id: 16,
      numeroCartao: '****7159',
      nomePortador: 'Rui Costa',
      numeroFuncionario: '15151',
      departamento: 'Desenvolvimento',
      tipo: 'Profissional',
      status: 'ativo',
      dataEmissao: '2023-06-14',
      dataExpiracao: '2025-06-14',
      ultimoAcesso: '2024-01-21 16:00',
      observacoes: 'Acesso a servidores'
    },
    {
      id: 17,
      numeroCartao: '****8260',
      nomePortador: 'Helena Dias',
      numeroFuncionario: '16161',
      departamento: 'Jurídico',
      tipo: 'Prestador',
      status: 'expirando',
      dataEmissao: '2022-04-05',
      dataExpiracao: '2024-04-05',
      ultimoAcesso: '2024-01-19 14:30',
      observacoes: 'Consultoria externa'
    },
    {
      id: 18,
      numeroCartao: '****5937',
      nomePortador: 'Nuno Silva',
      numeroFuncionario: '17171',
      departamento: 'Auditoria',
      tipo: 'Profissional',
      status: 'bloqueado',
      dataEmissao: '2023-09-12',
      dataExpiracao: '2025-09-12',
      ultimoAcesso: '2024-01-18 10:20',
      observacoes: 'Investigação em curso'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
      case 'inativo':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
      case 'bloqueado':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
      case 'expirando':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'Ativo'
      case 'inativo':
        return 'Inativo'
      case 'bloqueado':
        return 'Bloqueado'
      case 'expirando':
        return 'Expirando'
      default:
        return status
    }
  }

  const isExpiringSoon = (dataExpiracao: string) => {
    const today = new Date()
    const expDate = new Date(dataExpiracao)
    const diffTime = expDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }

  const filteredCartoes = cartoes.filter(cartao => {
    const matchesSearch = cartao.nomePortador.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cartao.numeroFuncionario.includes(searchTerm) ||
                         cartao.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cartao.numeroCartao.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'todos' || cartao.status === statusFilter
    const matchesTipo = tipoFilter === 'todos' || cartao.tipo.toLowerCase() === tipoFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesTipo
  })

  const handleAtivar = (id: number) => {
    console.log('Ativando cartão:', id)
  }

  const handleDesativar = (id: number) => {
    console.log('Desativando cartão:', id)
  }

  const handleBloquear = (id: number) => {
    console.log('Bloqueando cartão:', id)
  }

  const handleRenovar = (id: number) => {
    console.log('Renovando cartão:', id)
  }

  const handleEliminar = (id: number) => {
    console.log('Eliminando cartão:', id)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="GERIR CARTÕES"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Estatísticas */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
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
                            placeholder="Pesquisar por nome, número de cartão, funcionário ou departamento..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                          Novo Cartão
                        </button>
                      </div>
                    </div>
                    
                    {/* Segunda linha - Filtros (condicionalmente visível) */}
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
                            <option value="todos">Todos os Status</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                            <option value="bloqueado">Bloqueado</option>
                            <option value="expirando">Expirando</option>
                          </select>
                        </div>
                        
                        <div className="sm:w-48">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Tipo
                          </label>
                          <select
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            value={tipoFilter}
                            onChange={(e) => setTipoFilter(e.target.value)}
                          >
                            <option value="todos">Todos os Tipos</option>
                            <option value="profissional">Profissional</option>
                            <option value="prestador">Prestador</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Lista de Cartões */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col" style={{ height: showFilters ? 'calc(100vh - 500px)' : 'calc(100vh - 400px)' }}>
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Cartões Registados ({filteredCartoes.length})
                  </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  <div className="min-w-full">
                    <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                            Cartão
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                            Portador
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                            Departamento
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/12">
                            Tipo
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/12">
                            Status
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                            Expiração
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredCartoes.map((cartao) => (
                          <tr key={cartao.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-3 py-4">
                              <div className="flex items-center">
                                <IdentificationIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                                <div className="min-w-0">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {cartao.numeroCartao}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    Emitido: {new Date(cartao.dataEmissao).toLocaleDateString('pt-PT')}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {cartao.nomePortador}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                  Nº {cartao.numeroFuncionario}
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-900 dark:text-white">
                              <div className="truncate">{cartao.departamento}</div>
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-900 dark:text-white">
                              <div className="truncate">{cartao.tipo}</div>
                            </td>
                            <td className="px-3 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cartao.status)}`}>
                                {getStatusText(cartao.status)}
                              </span>
                              {isExpiringSoon(cartao.dataExpiracao) && (
                                <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                                  Expira em breve
                                </div>
                              )}
                            </td>
                            <td className="px-3 py-4">
                              <div className="min-w-0">
                                <div className="text-sm text-gray-900 dark:text-white truncate">
                                  {new Date(cartao.dataExpiracao).toLocaleDateString('pt-PT')}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                  Último: {cartao.ultimoAcesso}
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-4 text-sm font-medium">
                              <div className="flex space-x-1">
                                <button
                                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                  title="Ver detalhes"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                
                                <button
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                  title="Editar"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                
                                {cartao.status === 'inativo' && (
                                  <button
                                    onClick={() => handleAtivar(cartao.id)}
                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                    title="Ativar"
                                  >
                                    <CheckCircleIcon className="h-4 w-4" />
                                  </button>
                                )}
                                
                                {cartao.status === 'ativo' && (
                                  <button
                                    onClick={() => handleDesativar(cartao.id)}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                    title="Desativar"
                                  >
                                    <XCircleIcon className="h-4 w-4" />
                                  </button>
                                )}
                                
                                {(cartao.status === 'ativo' || cartao.status === 'inativo') && (
                                  <button
                                    onClick={() => handleBloquear(cartao.id)}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    title="Bloquear"
                                  >
                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                  </button>
                                )}
                                
                                {cartao.status === 'expirando' && (
                                  <button
                                    onClick={() => handleRenovar(cartao.id)}
                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                    title="Renovar"
                                  >
                                    <ClockIcon className="h-4 w-4" />
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => handleEliminar(cartao.id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  title="Eliminar"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {filteredCartoes.length === 0 && (
                  <div className="text-center py-12">
                    <IdentificationIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      Nenhum cartão encontrado
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Tente ajustar os filtros de pesquisa.
                    </p>
                  </div>
                )}
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