'use client'

import React, { useState } from 'react'
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  UserIcon,
  CreditCardIcon,
  PaperClipIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  IdentificationIcon,
  ArrowLeftIcon,
  ClockIcon,
  XMarkIcon, // Add this import
} from '@heroicons/react/24/outline'
import Sidebar from '@/app/components/navigation/Sidebar'
import Navbar from '@/app/components/navigation/Navbar'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import { getNavigationForSection } from '@/app/config/navigation'

export default function AcaoDevolucaoPage() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [dataDevolucao, setDataDevolucao] = useState('')
  const [servico, setServico] = useState('')
  const [motivo, setMotivo] = useState('')
  const [cartaoBomEstado, setCartaoBomEstado] = useState(false)
  const [observacao, setObservacao] = useState('')
  const [anexos, setAnexos] = useState<File[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Exemplo de dados do colaborador e cartão
  const colaborador = {
    nome: 'João Silva',
    numMec: '123456',
    departamento: 'Informática',
    contacto: 'joao.silva@email.com',
    cargo: 'Técnico de Informática',
    dataAdmissao: '2020-03-15',
  }
  
  const cartao = {
    numero: '****1234',
    tipo: 'Acesso Total',
    estado: 'Ativo',
    dataEmissao: '2024-01-15',
    dataExpiracao: '2026-01-15',
    ultimoUso: '2024-01-14 16:30',
  }

  const motivos = [
    'Fim de contrato',
    'Acesso expirado',
    'Substituição',
    'Roubo / Perda',
  ]

  // Checklist de devolução
  const checklist = [
    { label: 'Cartão desmagnetizado', done: true },
    { label: 'Etiqueta removida', done: false },
    { label: 'Assinatura do termo', done: true },
  ]

  // Use centralized navigation
  const navigation = getNavigationForSection('servico', '/pages/servico/devolucao_entrega/acao_devolucao')

  const notificacoes = [
    {
      id: 1,
      title: 'Cartão devolvido',
      description: 'Um cartão foi devolvido ao serviço.',
      time: 'há 5 minutos',
      status: 'info',
    },
  ]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!motivo.trim()) {
      alert('Por favor, selecione o motivo da devolução.')
      return
    }
    setShowConfirmation(true)
  }

  function handleAnexoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setAnexos([...anexos, ...Array.from(e.target.files)])
    }
  }

  const confirmSubmit = () => {
    console.log('Devolução registada!')
    setShowConfirmation(false)
    // Aqui faria a chamada à API para registar a devolução
    alert('Devolução registada com sucesso!')
  }

  const cancelSubmit = () => {
    setShowConfirmation(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="AÇÃO DE DEVOLUÇÃO"
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
                        <p className="mt-1 text-lg text-gray-900 dark:text-white font-medium">{colaborador.nome}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Número Mecanográfico
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white font-medium">{colaborador.numMec}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Departamento
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{colaborador.departamento}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Cargo
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{colaborador.cargo}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{colaborador.contacto}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Data de Admissão
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">
                          {new Date(colaborador.dataAdmissao).toLocaleDateString('pt-PT')}
                        </p>
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
                          Número do Cartão
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white font-medium">{cartao.numero}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Estado Atual
                        </label>
                        <span className="mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          {cartao.estado}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tipo de Acesso
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{cartao.tipo}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Data de Emissão
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">
                          {new Date(cartao.dataEmissao).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Data de Expiração
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">
                          {new Date(cartao.dataExpiracao).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Último Uso
                        </label>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{cartao.ultimoUso}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Formulário de Devolução */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <DocumentTextIcon className="h-6 w-6 mr-2" />
                      Detalhes da Devolução
                    </h2>
                  </div>
                  <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Data de Devolução */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Data de Devolução
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              value={dataDevolucao}
                              onChange={e => setDataDevolucao(e.target.value)}
                              className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                          </div>
                        </div>
                        
                        {/* Serviço */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Serviço
                          </label>
                          <input
                            type="text"
                            value={servico}
                            onChange={e => setServico(e.target.value)}
                            className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Nome do serviço"
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Motivo da Devolução */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Motivo da Devolução
                        </label>
                        <select
                          value={motivo}
                          onChange={e => setMotivo(e.target.value)}
                          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        >
                          <option value="">Selecione o motivo</option>
                          {motivos.map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Cartão bom estado - Modern Card */}
                      <div 
                        onClick={() => setCartaoBomEstado(!cartaoBomEstado)}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                          cartaoBomEstado 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                            cartaoBomEstado 
                              ? 'border-green-500 bg-green-500' 
                              : 'border-gray-300 dark:border-gray-500'
                          }`}>
                            {cartaoBomEstado && (
                              <CheckCircleIcon className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
                              Cartão em bom estado
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Confirme se o cartão está em condições adequadas
                            </p>
                          </div>
                        </div>
                        <input
                          id="cartaoBomEstado"
                          type="checkbox"
                          checked={cartaoBomEstado}
                          onChange={e => setCartaoBomEstado(e.target.checked)}
                          className="sr-only"
                        />
                      </div>
                      {/* Observações */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Observações
                        </label>
                        <textarea
                          rows={4}
                          value={observacao}
                          onChange={e => setObservacao(e.target.value)}
                          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Adicionar observações sobre a devolução..."
                        />
                      </div>
                      
                      {/* Anexos - Enhanced file input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <PaperClipIcon className="h-5 w-5 mr-2" />
                          Anexos
                        </label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                          <div className="space-y-2">
                            <PaperClipIcon className="mx-auto h-8 w-8 text-gray-400" />
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Escolher ficheiros</span>
                                <input
                                  id="file-upload"
                                  type="file"
                                  multiple
                                  className="sr-only"
                                  onChange={handleAnexoChange}
                                />
                              </label>
                              <span className="pl-1">ou arraste e largue aqui</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG, PDF até 10MB cada
                            </p>
                          </div>
                        </div>
                        {anexos.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Ficheiros selecionados:</h4>
                            <ul className="space-y-2">
                              {anexos.map((file, idx) => (
                                <li key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="flex items-center">
                                    <PaperClipIcon className="h-4 w-4 mr-2 text-gray-400" />
                                    <span className="text-sm text-gray-900 dark:text-white">{file.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newAnexos = anexos.filter((_, index) => index !== idx)
                                      setAnexos(newAnexos)
                                    }}
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                  >
                                    <XMarkIcon className="h-4 w-4" />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      {/* Botões de ação */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                          type="button"
                          className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => window.history.back()}
                        >
                          Cancelar
                        </button>
                        
                        <button
                          type="button"
                          className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={() => alert('Comprovativo impresso')}
                        >
                          Imprimir Comprovativo
                        </button>
                        
                        <button
                          type="submit"
                          className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          Registar Devolução
                        </button>
                      </div>
                    </form>
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
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-4">
                Confirmar Devolução
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tem certeza que deseja registar esta devolução?
                  <span className="block mt-2 font-medium">Motivo: {motivo}</span>
                  <span className="block font-medium">Data: {new Date(dataDevolucao).toLocaleDateString('pt-PT')}</span>
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex gap-3">
                  <button
                    onClick={confirmSubmit}
                    className="px-4 py-2 bg-green-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={cancelSubmit}
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
        notifications={notificacoes}
      />
    </div>
  )
}