'use client'

import { useState } from 'react'
import {
  UserIcon,
  IdentificationIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  ArrowLeftIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function ResumoPedido() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({})
  const [allCopied, setAllCopied] = useState(false)

  const navigation = getNavigationForSection('servico', '/pages/servico/pedido_cartao/resumo_pedido')

  const notifications = [
    {
      id: 1,
      title: 'Pedido Atualizado',
      description: 'O pedido foi atualizado com sucesso',
      time: 'Há 5 minutos',
      status: 'success',
    },
  ]

  // Mock data for the pedido
  const pedidoData = {
    id: 'PED-2024-001',
    colaborador: 'Miguel Pereira',
    numeroMec: '12345',
    departamento: 'Tecnologia da Informação',
    funcao: 'Desenvolvedor Senior',
    data: '26/07/2024',
    motivoPedido: '2ª Via - Cartão expirado',
    observacoes: 'Cartão anterior expirou no dia 25/07/2024. Colaborador necessita de acesso urgente às instalações para continuar com os projetos em curso. Aprovação do supervisor já obtida.',
    estado: 'PENDENTE'
  }

  const stats = [
    {
      name: 'ID do Pedido',
      value: pedidoData.id,
      icon: DocumentTextIcon,
      color: 'text-blue-500'
    },
    {
      name: 'Estado',
      value: pedidoData.estado,
      icon: CheckCircleIcon,
      color: 'text-yellow-500'
    },
    {
      name: 'Data do Pedido',
      value: pedidoData.data,
      icon: CalendarIcon,
      color: 'text-green-500'
    },
    {
      name: 'Tipo',
      value: '2ª Via',
      icon: IdentificationIcon,
      color: 'text-purple-500'
    },
  ]

  const handleAprovar = () => {
    alert(`Pedido ${pedidoData.id} aprovado!`)
  }

  const handleRecusar = () => {
    alert(`Pedido ${pedidoData.id} recusado!`)
  }

  const handleEditar = () => {
    alert(`Editando pedido ${pedidoData.id}`)
  }

  const handleVoltar = () => {
    window.history.back()
  }

  const handleCopy = async (value: string, statName: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedStates(prev => ({ ...prev, [statName]: true }))
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [statName]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleCopyAll = async () => {
    try {
      const formattedContent = stats.map(stat => `${stat.name}: ${stat.value}`).join('\n')
      await navigator.clipboard.writeText(formattedContent)
      setAllCopied(true)
      setTimeout(() => {
        setAllCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy all: ', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="RESUMO DO PEDIDO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Stats Cards */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Resumo do Pedido</h2>
                  <button
                    onClick={handleCopyAll}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    title="Copiar todos os dados"
                  >
                    {allCopied ? (
                      <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
                    )}
                    Copiar Tudo
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1">
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
                          <button
                            onClick={() => handleCopy(item.value, item.name)}
                            className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                            title={`Copiar ${item.name}`}
                          >
                            {copiedStates[item.name] ? (
                              <CheckIcon className="h-4 w-4 text-green-500" />
                            ) : (
                              <ClipboardDocumentIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex flex-row gap-2">
                  <button 
                    onClick={handleVoltar}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Voltar
                  </button>
                  <button 
                    onClick={handleEditar}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Editar
                  </button>
                  {pedidoData.estado === 'PENDENTE' && (
                    <>
                      <button
                        onClick={handleAprovar}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-2" />
                        Aprovar
                      </button>
                      <button
                        onClick={handleRecusar}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <XCircleIcon className="h-4 w-4 mr-2" />
                        Recusar
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Detalhes do Pedido
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Colaborador */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                        Colaborador
                      </label>
                      <div className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                        {pedidoData.colaborador}
                      </div>
                    </div>

                    {/* Nº MEC */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <IdentificationIcon className="h-4 w-4 mr-2 text-gray-400" />
                        Nº MEC
                      </label>
                      <div className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                        {pedidoData.numeroMec}
                      </div>
                    </div>

                    {/* Departamento */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <BuildingOfficeIcon className="h-4 w-4 mr-2 text-gray-400" />
                        Departamento
                      </label>
                      <div className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                        {pedidoData.departamento}
                      </div>
                    </div>

                    {/* Função */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <BriefcaseIcon className="h-4 w-4 mr-2 text-gray-400" />
                        Função
                      </label>
                      <div className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                        {pedidoData.funcao}
                      </div>
                    </div>

                    {/* Data */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                        Data
                      </label>
                      <div className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                        {pedidoData.data}
                      </div>
                    </div>

                    {/* Motivo do Pedido */}
                    <div className="space-y-1">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <DocumentTextIcon className="h-4 w-4 mr-2 text-gray-400" />
                        Motivo do Pedido
                      </label>
                      <div className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                        {pedidoData.motivoPedido}
                      </div>
                    </div>
                  </div>

                  {/* Observações */}
                  <div className="mt-6 space-y-1">
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2 text-gray-400" />
                      Observações
                    </label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[100px]">
                      {pedidoData.observacoes}
                    </div>
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