'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon,
  CalendarDaysIcon,
  IdentificationIcon,
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
        return { text: 'Ativo', color: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100', icon: <CheckIcon className="h-6 w-6 text-green-600" /> }
      case 'inativo':
        return { text: 'Inativo', color: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100', icon: <XMarkIcon className="h-6 w-6 text-red-600" /> }
      case 'expirado':
        return { text: 'Expirado', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100', icon: <MagnifyingGlassIcon className="h-6 w-6 text-yellow-600" /> }
      default:
        return { text: 'Desconhecido', color: 'bg-gray-100 text-gray-800', icon: null }
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="AÇÕES DO CARTÃO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 flex flex-col gap-8"
          >
            {/* Estado Atual do Cartão */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Estado Atual do Cartão:</span>
              <span className={`inline-flex items-center gap-2 px-4 py-1 rounded-full font-semibold ${getEstadoCartao().color}`}>
                {getEstadoCartao().icon}
                {getEstadoCartao().text}
              </span>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col gap-5">
              <button
                type="button"
                className="flex items-center justify-center gap-4 border-2 border-gray-400 rounded-xl bg-white py-4 px-4 text-xl font-semibold text-gray-800 shadow transition hover:bg-gray-50"
              >
                <MagnifyingGlassIcon className="h-7 w-7 text-gray-500" />
                REEMITIR CARTÃO
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-4 rounded-xl bg-red-600 py-4 px-4 text-xl font-semibold text-white shadow transition hover:bg-red-700"
              >
                <XMarkIcon className="h-7 w-7 text-white" />
                DESATIVAR CARTÃO
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-4 rounded-xl bg-green-600 py-4 px-4 text-xl font-semibold text-white shadow transition hover:bg-green-700"
              >
                <CheckIcon className="h-7 w-7 text-white" />
                ATIVAR NOVAMENTE
              </button>
            </div>

            {/* Observações / Justificação */}
            <div>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-200 mb-2">
                Observações / Justificação <span className="text-red-500">*</span>
              </label>
              <textarea
                value={observacoes}
                onChange={e => setObservacoes(e.target.value)}
                required
                rows={3}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Descreva o motivo da ação..."
              />
            </div>

            {/* Editar validade ou tipo */}
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setShowEditar(v => !v)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-indigo-500 text-indigo-700 dark:text-indigo-200 bg-indigo-50 dark:bg-indigo-900 font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
              >
                <CalendarDaysIcon className="h-5 w-5" />
                <IdentificationIcon className="h-5 w-5" />
                Editar validade ou tipo
              </button>
              {showEditar && (
                <form
                  onSubmit={handleEditarSubmit}
                  className="w-full mt-3 flex flex-col gap-3 bg-indigo-50 dark:bg-indigo-900 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Nova validade
                      </label>
                      <input
                        type="date"
                        value={validade}
                        onChange={e => setValidade(e.target.value)}
                        className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Tipo de cartão
                      </label>
                      <select
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                        className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="profissional">Profissional IPO</option>
                        <option value="prestador">Prestador de Serviços</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
                    >
                      Guardar Alterações
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Botão de submeter */}
            <button
              type="submit"
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition text-lg"
            >
              Guardar Ação
            </button>
          </form>
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