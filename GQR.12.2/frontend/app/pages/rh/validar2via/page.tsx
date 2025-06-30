'use client'

import { Fragment, useState } from 'react'
import { 
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentCheckIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function Validar2Via() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')

  const notifications = [
    {
      id: 1,
      title: 'Nova Solicitação de 2ª Via',
      description: 'Ana Costa solicitou 2ª via do cartão',
      time: 'Há 10 minutos',
      status: 'new',
    },
    {
      id: 2,
      title: '2ª Via Aprovada',
      description: 'Solicitação de Carlos Silva foi aprovada',
      time: 'Há 1 hora',
      status: 'success',
    },
    {
      id: 3,
      title: 'Documentação Pendente',
      description: 'Falta documentação para validar 2ª via de Maria Santos',
      time: 'Há 3 horas',
      status: 'warning',
    },
  ]
  
  // Use centralized navigation and add subItems for this specific page
  const baseNavigation = getNavigationForSection('rh', '/pages/rh/validar2via')
  const navigation = baseNavigation.map(item => {
    if (item.name === 'Validar 2ª Via') {
      return {
        ...item,
        subItems: [
          { name: 'Ações', href: '/pages/rh/validar2via/acoes', current: false }
        ]
      }
    }
    return item
  })

  const stats = [
    { name: 'Pendentes de Validação', value: '15', icon: ClockIcon, color: 'text-yellow-500' },
    { name: 'Aprovadas Hoje', value: '8', icon: CheckCircleIcon, color: 'text-green-500' },
    { name: 'Rejeitadas Hoje', value: '2', icon: XCircleIcon, color: 'text-red-500' },
    { name: 'Total do Mês', value: '45', icon: DocumentCheckIcon, color: 'text-blue-500' },
  ]

  const solicitacoes = [
    {
      id: 1,
      nome: 'Ana Costa',
      numeroFuncionario: '12345',
      departamento: 'Recursos Humanos',
      motivoSolicitacao: 'Cartão perdido',
      datasolicitacao: '2024-01-15',
      status: 'pendente',
      documentos: ['BI', 'Declaração de perda'],
      observacoes: 'Funcionária relatou perda do cartão no transporte público'
    },
    {
      id: 2,
      nome: 'Carlos Silva',
      numeroFuncionario: '67890',
      departamento: 'Tecnologia',
      motivoSolicitacao: 'Cartão danificado',
      datasolicitacao: '2024-01-14',
      status: 'aprovado',
      documentos: ['BI', 'Foto do cartão danificado'],
      observacoes: 'Cartão apresenta danos físicos que impedem a leitura'
    },
    {
      id: 3,
      nome: 'Maria Santos',
      numeroFuncionario: '11111',
      departamento: 'Financeiro',
      motivoSolicitacao: 'Cartão roubado',
      datasolicitacao: '2024-01-13',
      status: 'rejeitado',
      documentos: ['BI'],
      observacoes: 'Falta apresentar participação às autoridades'
    },
    {
      id: 4,
      nome: 'João Oliveira',
      numeroFuncionario: '22222',
      departamento: 'Operações',
      motivoSolicitacao: 'Cartão perdido',
      datasolicitacao: '2024-01-12',
      status: 'pendente',
      documentos: ['BI', 'Declaração de perda'],
      observacoes: 'Primeira solicitação de 2ª via'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
      case 'aprovado':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
      case 'rejeitado':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente'
      case 'aprovado':
        return 'Aprovado'
      case 'rejeitado':
        return 'Rejeitado'
      default:
        return status
    }
  }

  const filteredSolicitacoes = solicitacoes.filter(solicitacao => {
    const matchesSearch = solicitacao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solicitacao.numeroFuncionario.includes(searchTerm) ||
                         solicitacao.departamento.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'todos' || solicitacao.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleAprovar = (id: number) => {
    // Lógica para aprovar solicitação
    console.log('Aprovando solicitação:', id)
  }

  const handleRejeitar = (id: number) => {
    // Lógica para rejeitar solicitação
    console.log('Rejeitando solicitação:', id)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="VALIDAR 2ª VIA DE CARTÕES"
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
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Barra de Pesquisa */}
                    <div className="flex-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Pesquisar por nome, número de funcionário ou departamento..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Filtro de Status */}
                    <div className="sm:w-48">
                      <select
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="todos">Todos os Status</option>
                        <option value="pendente">Pendente</option>
                        <option value="aprovado">Aprovado</option>
                        <option value="rejeitado">Rejeitado</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de Solicitações */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Solicitações de 2ª Via ({filteredSolicitacoes.length})
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Funcionário
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Departamento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Motivo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Data Solicitação
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredSolicitacoes.map((solicitacao) => (
                        <tr key={solicitacao.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {solicitacao.nome}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Nº {solicitacao.numeroFuncionario}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {solicitacao.departamento}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {solicitacao.motivoSolicitacao}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {new Date(solicitacao.datasolicitacao).toLocaleDateString('pt-PT')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(solicitacao.status)}`}>
                              {getStatusText(solicitacao.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                title="Ver detalhes"
                              >
                                <EyeIcon className="h-5 w-5" />
                              </button>
                              
                              {solicitacao.status === 'pendente' && (
                                <>
                                  <button
                                    onClick={() => handleAprovar(solicitacao.id)}
                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                    title="Aprovar"
                                  >
                                    <CheckIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => handleRejeitar(solicitacao.id)}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    title="Rejeitar"
                                  >
                                    <XMarkIcon className="h-5 w-5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredSolicitacoes.length === 0 && (
                  <div className="text-center py-12">
                    <DocumentCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      Nenhuma solicitação encontrada
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