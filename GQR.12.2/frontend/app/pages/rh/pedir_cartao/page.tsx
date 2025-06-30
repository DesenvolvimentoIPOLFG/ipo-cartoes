'use client'

import React, { useState } from 'react'
import { 
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function PedirCartao() {
  const [currentStep, setCurrentStep] = useState(1)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Pedido Submetido com Sucesso',
      description: 'O seu pedido de cartão foi enviado para validação',
      time: 'Há 2 minutos',
      status: 'success',
    },
    {
      id: 2,
      title: 'Documentação Necessária',
      description: 'Lembre-se de anexar todos os documentos obrigatórios',
      time: 'Há 15 minutos',
      status: 'warning',
    },
    {
      id: 3,
      title: 'Novo Formulário Disponível',
      description: 'Formulário de pedido de cartão foi atualizado',
      time: 'Há 1 hora',
      status: 'new',
    },
    {
      id: 4,
      title: 'Prazo de Entrega',
      description: 'Cartões são entregues em até 5 dias úteis após aprovação',
      time: 'Há 2 horas',
      status: 'info',
    },
  ])
  const [formData, setFormData] = useState({
    // Dados do Colaborador
    nome: '',
    num_mec: '',
    departamento: '',
    email: '',
    // Dados do Cartão
    tipo: '',
    motivo: '',
    urgencia: '',
    // Datas
    data_entrega: '',
    data_validade: ''
  })

  const navigation = getNavigationForSection('rh', '/pages/rh/pedir_cartao')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add API call here
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleReset = () => {
    setFormData({
      nome: '',
      num_mec: '',
      departamento: '',
      email: '',
      tipo: '',
      motivo: '',
      urgencia: '',
      data_entrega: '',
      data_validade: ''
    })
  }

  const tiposCartao = [
    { value: '', label: 'Selecione o tipo de cartão' },
    { value: 'profissional_ipo', label: 'Profissional do IPO' },
    { value: 'prestador_servicos', label: 'Prestador de Serviços' },
  ]

  const motivosPedido = [
    { value: '', label: 'Selecione o motivo' },
    { value: 'primeira_via', label: '1ª Via' },
    { value: 'segunda_via', label: '2ª Via' },
    { value: 'perda_dano', label: 'Perda/Dano' },
    { value: 'outro', label: 'Outro Motivo' },
  ]

  const niveisUrgencia = [
    { value: '', label: 'Selecione a urgência' },
    { value: 'alta', label: 'Alta' },
    { value: 'media', label: 'Média' },
    { value: 'baixa', label: 'Baixa' },
  ]

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                1º PASSO - Dados do Colaborador
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nome Completo *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Digite o nome completo"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="num_mec" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Num_Mec *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="num_mec"
                      name="num_mec"
                      value={formData.num_mec}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Digite o número MEC"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Departamento *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="departamento"
                      name="departamento"
                      value={formData.departamento}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Digite o departamento"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Digite o email"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                2º PASSO - Dados do Cartão a Pedir
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tipo de Cartão *
                  </label>
                  <div className="mt-1">
                    <select
                      id="tipo"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {tiposCartao.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="motivo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Motivo do Pedido *
                  </label>
                  <div className="mt-1">
                    <select
                      id="motivo"
                      name="motivo"
                      value={formData.motivo}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {motivosPedido.map((motivo) => (
                        <option key={motivo.value} value={motivo.value}>
                          {motivo.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="urgencia" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Urgência do Pedido *
                  </label>
                  <div className="mt-1">
                    <select
                      id="urgencia"
                      name="urgencia"
                      value={formData.urgencia}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {niveisUrgencia.map((nivel) => (
                        <option key={nivel.value} value={nivel.value}>
                          {nivel.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                3º PASSO - Data de Entrega & Validade do Cartão
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="data_entrega" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Data de Entrega *
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="data_entrega"
                      name="data_entrega"
                      value={formData.data_entrega}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="data_validade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Data de Validade do Cartão *
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="data_validade"
                      name="data_validade"
                      value={formData.data_validade}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const steps = [
    { id: 1, name: 'Dados do Colaborador' },
    { id: 2, name: 'Dados do Cartão' },
    { id: 3, name: 'Datas de Entrega e Validade' }
  ]

  const renderProgressBar = () => (
    <div className="mb-8 flex justify-center">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <li key={step.id} className="flex items-center">
              <div
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  currentStep > step.id
                    ? 'bg-green-100 text-green-800'
                    : currentStep === step.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
                    currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : currentStep === step.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-400 text-white'
                  }`}
                >
                  {currentStep > step.id ? '✓' : step.id}
                </span>
                {step.name}
              </div>
              {index < steps.length - 1 && (
                <svg
                  className="w-5 h-5 text-gray-400 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="PEDIR CARTÃO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          showBackButton={true}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              {renderProgressBar()}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderStep()}

                {/* Botões de Ação */}
                <div className="flex justify-between space-x-3 pt-6">
                  <div className="flex space-x-3">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Voltar
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <XMarkIcon className="h-4 w-4 mr-2" />
                      Limpar
                    </button>
                  </div>
                  <div>
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Próximo
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <CheckIcon className="h-4 w-4 mr-2" />
                        Submeter
                      </button>
                    )}
                  </div>
                </div>
              </form>
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
