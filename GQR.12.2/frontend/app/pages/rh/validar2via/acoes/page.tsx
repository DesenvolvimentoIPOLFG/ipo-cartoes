'use client'

import React, { useState } from 'react'
import { 
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  UserIcon,
  IdentificationIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function AcoesValidar2Via() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [decision, setDecision] = useState('')
  const [rejectReason, setRejectReason] = useState('')
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
  ]
  
  // Use centralized navigation and add subItems for this specific page
  const baseNavigation = getNavigationForSection('rh', '/pages/rh/validar2via/acoes')
  const navigation = baseNavigation.map(item => {
    if (item.name === 'Validar 2ª Via') {
      return {
        ...item,
        subItems: [
          { name: 'Ações', href: '/pages/rh/validar2via/acoes', current: true }
        ]
      }
    }
    return item
  })

  // Dados do colaborador e solicitação
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
    status: 'pendente',
    cartaoAnterior: {
      numero: '****1234',
      dataEmissao: '2022-01-10',
      dataExpiracao: '2024-01-10',
      ultimoUso: '2024-01-14 16:30',
      estado: 'Bloqueado'
    },
    observacoes: 'Funcionária relatou perda do cartão no transporte público na linha de Sintra. Cartão foi imediatamente bloqueado no sistema.'
  }

  const handleDecision = (type: 'approve' | 'reject') => {
    if (type === 'reject' && !rejectReason.trim()) {
      alert('Por favor, indique a razão da rejeição.')
      return
    }
    setDecision(type)
    setShowConfirmation(true)
  }

  const confirmDecision = () => {
    console.log('Decision:', decision)
    console.log('Reject Reason:', rejectReason)
    // Aqui faria a chamada à API para aprovar/rejeitar
    setShowConfirmation(false)
    // Redirecionar de volta à página principal
    window.history.back()
  }

  const cancelDecision = () => {
    setDecision('')
    setRejectReason('')
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header com botão voltar */}
              <div className="mb-6">
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Voltar à Lista
                </button>
              </div>

              <div className="space-y-6">
                {/* 1. Dados do Colaborador */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <UserIcon className="h-6 w-6 mr-2" />
                      Dados do Colaborador
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Nome Completo
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white font-medium">{solicitacao.nome}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Número de Funcionário
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white font-medium">{solicitacao.numeroFuncionario}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Departamento
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{solicitacao.departamento}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Cargo
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{solicitacao.cargo}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{solicitacao.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Telefone
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{solicitacao.telefone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Estado do Cartão */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <IdentificationIcon className="h-6 w-6 mr-2" />
                      Estado do Cartão
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Número do Cartão Anterior
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white font-medium">{solicitacao.cartaoAnterior.numero}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Estado Atual
                        </label>
                        <span className="mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                          {solicitacao.cartaoAnterior.estado}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Data de Emissão
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">
                          {new Date(solicitacao.cartaoAnterior.dataEmissao).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Último Uso
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{solicitacao.cartaoAnterior.ultimoUso}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Motivo e Data do Pedido */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <DocumentTextIcon className="h-6 w-6 mr-2" />
                      Detalhes da Solicitação
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Motivo da Solicitação
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white font-medium">{solicitacao.motivoSolicitacao}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Data da Solicitação
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white font-medium">
                          {new Date(solicitacao.datasolicitacao).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Observações
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                        {solicitacao.observacoes}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Ações de Validação */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Ações de Validação
                    </h2>
                  </div>
                  <div className="p-6">
                    {/* Campo para razão de rejeição */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Razão da Rejeição (obrigatório se rejeitar)
                      </label>
                      <textarea
                        rows={4}
                        className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Indique a razão da rejeição caso seja necessário..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                      />
                    </div>
                    
                    {/* Botões de ação */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => handleDecision('approve')}
                        className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Aprovar Pedido
                      </button>
                      
                      <button
                        onClick={() => handleDecision('reject')}
                        className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <XCircleIcon className="h-5 w-5 mr-2" />
                        Recusar Pedido
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Confirmação */}
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
                  Tem certeza que deseja {decision === 'approve' ? 'aprovar' : 'rejeitar'} esta solicitação?
                  {decision === 'reject' && rejectReason && (
                    <span className="block mt-2 font-medium">Razão: {rejectReason}</span>
                  )}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex gap-3">
                  <button
                    onClick={confirmDecision}
                    className={`px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      decision === 'approve'
                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                        : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                    }`}
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={cancelDecision}
                    className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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