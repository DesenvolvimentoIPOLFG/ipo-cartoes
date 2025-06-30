'use client'

import React, { useState } from 'react'
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon,
  CalendarDaysIcon,
  IdentificationIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

export default function AcoesCartao() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [observacoes, setObservacoes] = useState('')
  const [estadoCartao, setEstadoCartao] = useState<'ativo' | 'inativo' | 'expirado'>('ativo')
  const [showEditar, setShowEditar] = useState(false)
  const [validade, setValidade] = useState('')
  const [tipo, setTipo] = useState('profissional')
  const [acaoSelecionada, setAcaoSelecionada] = useState('')

  const notifications = [
    {
      id: 1,
      title: 'Ação Executada',
      description: 'Cartão foi bloqueado com sucesso',
      time: 'Há 5 minutos',
      status: 'success',
    },
    {
      id: 2,
      title: 'Ação Pendente',
      description: 'Renovação de cartão aguardando aprovação',
      time: 'Há 30 minutos',
      status: 'warning',
    },
    {
      id: 3,
      title: 'Nova Ação Disponível',
      description: 'Nova ação de gestão disponível para o cartão',
      time: 'Há 1 hora',
      status: 'info',
    },
  ]

  const navigation = [
    { name: 'Dashboard', href: '/pages/rh/dashboard', icon: ChartBarIcon, current: false },
    { name: 'Pedir Cartão', href: '/pages/rh/pedir_cartao', icon: ChartBarIcon, current: false },
    { name: 'Validar 2ª Via', href: '/pages/rh/validar2via', icon: ChartBarIcon, current: false },
    {
      name: 'Gerir Cartão',
      href: '/pages/rh/gerir_cartao',
      icon: ChartBarIcon,
      current: true,
      subItems: [
        { name: 'Dados do Colaborador', href: '/pages/rh/gerir_cartao/dados_colaborador', current: false },
        { name: 'Cartão', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao', current: false },
        { name: 'Ações', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao/acoes', current: true }
      ]
    },
  ]

  // Função para cor e texto do estado do cartão
  const getEstadoCartao = () => {
    switch (estadoCartao) {
      case 'ativo':
        return { text: 'Ativo', color: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100', icon: <CheckIcon className="h-4 w-4 text-green-600" /> }
      case 'inativo':
        return { text: 'Inativo', color: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100', icon: <XMarkIcon className="h-4 w-4 text-red-600" /> }
      case 'expirado':
        return { text: 'Expirado', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100', icon: <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" /> }
      default:
        return { text: 'Desconhecido', color: 'bg-gray-100 text-gray-800', icon: null }
    }
  }

  const acoes = [
    {
      id: 'reemitir',
      nome: 'REEMITIR CARTÃO',
      descricao: 'Emitir um novo cartão',
      icon: <MagnifyingGlassIcon className="h-5 w-5" />,
      cor: 'bg-gray-100 text-gray-600'
    },
    {
      id: 'desativar',
      nome: 'DESATIVAR CARTÃO',
      descricao: 'Desativar o cartão',
      icon: <XMarkIcon className="h-5 w-5" />,
      cor: 'bg-red-100 text-red-600'
    },
    {
      id: 'ativar',
      nome: 'ATIVAR NOVAMENTE',
      descricao: 'Reativar o cartão',
      icon: <CheckIcon className="h-5 w-5" />,
      cor: 'bg-green-100 text-green-600'
    }
  ]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!acaoSelecionada) {
      alert('Por favor, selecione uma ação.')
      return
    }
    if (!observacoes.trim()) {
      alert('Por favor, preencha o campo de observações/justificação.')
      return
    }
    alert('Ação executada com sucesso!')
  }

  function handleEditarSubmit(e: React.FormEvent) {
    e.preventDefault()
    setShowEditar(false)
    alert('Validade e tipo editados com sucesso!')
  }

  function handleReset() {
    setObservacoes('')
    setAcaoSelecionada('')
    setValidade('')
    setTipo('profissional')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="AÇÕES DO CARTÃO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1">
          <div className="py-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Formulário de Ações */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                      <CreditCardIcon className="h-5 w-5 mr-2" />
                      Ações do Cartão
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Estado Atual:</span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getEstadoCartao().color}`}>
                        {getEstadoCartao().icon}
                        {getEstadoCartao().text}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                      {/* Coluna Esquerda - Seleção de Ação */}
                      <div className="h-full flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Selecione a ação a executar *
                        </label>
                        <div className="space-y-3 flex-1">
                          {acoes.map((acao) => (
                            <button
                              key={acao.id}
                              type="button"
                              onClick={() => setAcaoSelecionada(acao.id)}
                              className={`w-full flex items-center justify-between p-3 border-2 rounded-lg transition ${
                                acaoSelecionada === acao.id
                                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${acao.cor}`}>
                                  {acao.icon}
                                </div>
                                <div className="text-left">
                                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                                    {acao.nome}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {acao.descricao}
                                  </div>
                                </div>
                              </div>
                              {acaoSelecionada === acao.id && (
                                <CheckIcon className="h-4 w-4 text-indigo-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Coluna Direita - Editar validade ou tipo */}
                      <div className="h-full flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Editar validade ou tipo (opcional)
                        </label>
                        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg flex-1 flex flex-col justify-center">
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="validade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nova validade
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  id="validade"
                                  name="validade"
                                  value={validade}
                                  onChange={e => setValidade(e.target.value)}
                                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tipo de cartão
                              </label>
                              <div className="mt-1">
                                <select
                                  id="tipo"
                                  name="tipo"
                                  value={tipo}
                                  onChange={e => setTipo(e.target.value)}
                                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                  <option value="profissional">Profissional IPO</option>
                                  <option value="prestador">Prestador de Serviços</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Observações - Full Width Below */}
                    <div>
                      <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Observações / Justificação (opcional)
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="observacoes"
                          name="observacoes"
                          value={observacoes}
                          onChange={e => setObservacoes(e.target.value)}
                          required
                          rows={4}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                          placeholder="Descreva o motivo da ação..."
                        />
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      {/* Informações Importantes - Compacta */}
                      <div className="flex items-start space-x-2 max-w-md">
                        <ExclamationTriangleIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-blue-800 dark:text-blue-200">Informações Importantes</p>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                            Todas as ações são registadas. Observações são obrigatórias para auditoria.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <XMarkIcon className="h-4 w-4 mr-2" />
                          Limpar
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <CheckIcon className="h-4 w-4 mr-2" />
                          Executar Ação
                        </button>
                      </div>
                    </div>
                  </form>
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