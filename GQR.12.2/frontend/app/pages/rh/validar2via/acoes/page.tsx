'use client'

import { Fragment, useState } from 'react'
import { 
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  UserIcon,
  IdentificationIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  PaperClipIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

export default function AcoesValidar2Via() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [decision, setDecision] = useState('')
  const [comments, setComments] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const notifications = [
    {
      id: 1,
      title: 'Solicitação Urgente',
      description: 'Esta solicitação foi marcada como urgente',
      time: 'Há 2 minutos',
      status: 'warning',
    },
    {
      id: 2,
      title: 'Documentação Completa',
      description: 'Todos os documentos foram anexados',
      time: 'Há 5 minutos',
      status: 'success',
    },
    {
      id: 3,
      title: 'Prazo de Resposta',
      description: 'Resposta necessária em 24 horas',
      time: 'Há 10 minutos',
      status: 'info',
    },
  ]
  
  const navigation = [
    { name: 'Dashboard', href: '/pages/rh/dashboard', icon: ChartBarIcon, current: false },
    { name: 'Pedir Cartão', href: '/pages/rh/pedir_cartao', icon: ChartBarIcon, current: false },
    { 
      name: 'Validar 2ª Via', 
      href: '/pages/rh/validar2via', 
      icon: ChartBarIcon, 
      current: true,
      subItems: [
        { name: 'Ações', href: '/pages/rh/validar2via/acoes', current: true }
      ]
    },
    { name: 'Gerir Cartão', href: '/pages/rh/gerir_cartao', icon: ChartBarIcon, current: false },
  ]

  // Mock data for the collaborator request
  const solicitacao = {
    id: 1,
    nome: 'Ana Costa',
    numeroFuncionario: '12345',
    departamento: 'Recursos Humanos',
    email: 'ana.costa@ipo.pt',
    telefone: '+351 912 345 678',
    cargo: 'Técnica Superior de RH',
    dataAdmissao: '2020-03-15',
    motivoSolicitacao: 'Cartão perdido',
    datasolicitacao: '2024-01-15',
    urgencia: 'Alta',
    status: 'pendente',
    cartaoAnterior: {
      numero: '****1234',
      dataEmissao: '2022-01-10',
      dataExpiracao: '2024-01-10',
      ultimoUso: '2024-01-14 16:30'
    },
    documentos: [
      { nome: 'Bilhete de Identidade', tipo: 'PDF', tamanho: '2.1 MB', anexado: true },
      { nome: 'Declaração de Perda', tipo: 'PDF', tamanho: '1.5 MB', anexado: true },
      { nome: 'Foto 3x4', tipo: 'JPG', tamanho: '0.8 MB', anexado: true }
    ],
    observacoes: 'Funcionária relatou perda do cartão no transporte público na linha de Sintra. Cartão foi imediatamente bloqueado no sistema. Esta é a primeira solicitação de 2ª via da funcionária.',
    historico: [
      { data: '2024-01-15 09:30', acao: 'Solicitação criada', usuario: 'Ana Costa' },
      { data: '2024-01-15 09:45', acao: 'Documentos anexados', usuario: 'Ana Costa' },
      { data: '2024-01-15 10:00', acao: 'Cartão anterior bloqueado', usuario: 'Sistema' },
      { data: '2024-01-15 14:30', acao: 'Encaminhado para validação', usuario: 'Sistema' }
    ]
  }

  const handleDecision = (type: 'approve' | 'reject') => {
    setDecision(type)
    setShowConfirmation(true)
  }

  const confirmDecision = () => {
    console.log('Decision:', decision)
    console.log('Comments:', comments)
    // Here you would make the API call to approve/reject
    setShowConfirmation(false)
    // Redirect back to the main validation page
    window.history.back()
  }

  const cancelDecision = () => {
    setDecision('')
    setComments('')
    setShowConfirmation(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="VALIDAR SOLICITAÇÃO DE 2ª VIA"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header with back button */}
              <div className="mb-6">
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Voltar à Lista
                </button>
              </div>

              {/* Main content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - Main details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Collaborator Information */}
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                        <UserIcon className="h-5 w-5 mr-2" />
                        Dados do Colaborador
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome Completo
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{solicitacao.nome}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Número de Funcionário
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{solicitacao.numeroFuncionario}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Departamento
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{solicitacao.departamento}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Cargo
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{solicitacao.cargo}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{solicitacao.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Telefone
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{solicitacao.telefone}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Data de Admissão
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {new Date(solicitacao.dataAdmissao).toLocaleDateString('pt-PT')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                        <DocumentTextIcon className="h-5 w-5 mr-2" />
                        Detalhes da Solicitação
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Motivo da Solicitação
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{solicitacao.motivoSolicitacao}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Data da Solicitação
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {new Date(solicitacao.datasolicitacao).toLocaleDateString('pt-PT')}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Urgência
                          </label>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            solicitacao.urgencia === 'Alta' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                              : solicitacao.urgencia === 'Média'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                              : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          }`}>
                            {solicitacao.urgencia}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Status
                          </label>
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                            Pendente
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Observações
                        </label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          {solicitacao.observacoes}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Previous Card Information */}
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                        <IdentificationIcon className="h-5 w-5 mr-2" />
                        Cartão Anterior
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Número do Cartão
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{solicitacao.cartaoAnterior.numero}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Data de Emissão
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {new Date(solicitacao.cartaoAnterior.dataEmissao).toLocaleDateString('pt-PT')}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Data de Expiração
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {new Date(solicitacao.cartaoAnterior.dataExpiracao).toLocaleDateString('pt-PT')}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Último Uso
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{solicitacao.cartaoAnterior.ultimoUso}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                        <PaperClipIcon className="h-5 w-5 mr-2" />
                        Documentos Anexados
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {solicitacao.documentos.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-md">
                            <div className="flex items-center">
                              <PaperClipIcon className="h-5 w-5 text-gray-400 mr-3" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{doc.nome}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{doc.tipo} • {doc.tamanho}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {doc.anexado && (
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                              )}
                              <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm">
                                Ver
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column - Actions and History */}
                <div className="space-y-6">
                  {/* Decision Actions */}
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Ações de Validação
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Comentários (opcional)
                        </label>
                        <textarea
                          rows={4}
                          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Adicione comentários sobre a decisão..."
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-3">
                        <button
                          onClick={() => handleDecision('approve')}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <CheckCircleIcon className="h-4 w-4 mr-2" />
                          Aprovar Solicitação
                        </button>
                        
                        <button
                          onClick={() => handleDecision('reject')}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <XCircleIcon className="h-4 w-4 mr-2" />
                          Rejeitar Solicitação
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* History */}
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        Histórico
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="flow-root">
                        <ul className="-mb-8">
                          {solicitacao.historico.map((item, index) => (
                            <li key={index}>
                              <div className="relative pb-8">
                                {index !== solicitacao.historico.length - 1 && (
                                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-600" aria-hidden="true" />
                                )}
                                <div className="relative flex space-x-3">
                                  <div>
                                    <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                                      <CalendarIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                      <p className="text-sm text-gray-900 dark:text-white">{item.acao}</p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">por {item.usuario}</p>
                                    </div>
                                    <div className="text-right text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                      {item.data}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3 text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
                decision === 'approve' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {decision === 'approve' ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-600" />
                )}
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-4">
                Confirmar {decision === 'approve' ? 'Aprovação' : 'Rejeição'}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tem certeza que deseja {decision === 'approve' ? 'aprovar' : 'rejeitar'} esta solicitação de 2ª via?
                  {comments && (
                    <span className="block mt-2 font-medium">Comentário: "{comments}"</span>
                  )}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex space-x-3">
                  <button
                    onClick={confirmDecision}
                    className={`px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm ${
                      decision === 'approve'
                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                        : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={cancelDecision}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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