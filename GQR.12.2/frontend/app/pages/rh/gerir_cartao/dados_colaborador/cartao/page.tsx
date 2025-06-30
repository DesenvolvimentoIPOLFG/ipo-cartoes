'use client'

import React, { useState } from 'react'
import { 
  CreditCardIcon,
  IdentificationIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function CartaoColaborador() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [numeroMec, setNumeroMec] = useState('')
  const [tipo, setTipo] = useState('')
  const [estado, setEstado] = useState('')
  const [dataEmissao, setDataEmissao] = useState('')
  const [validade, setValidade] = useState('')

  const notifications = [
    {
      id: 1,
      title: 'Cartão Ativado',
      description: 'Cartão do colaborador foi ativado com sucesso',
      time: 'Há 10 minutos',
      status: 'success',
    },
    {
      id: 2,
      title: 'Cartão Expirado',
      description: 'Cartão necessita renovação',
      time: 'Há 1 hora',
      status: 'warning',
    },
    {
      id: 3,
      title: 'Novo Cartão Emitido',
      description: 'Novo cartão foi emitido para o colaborador',
      time: 'Há 3 horas',
      status: 'info',
    },
  ]
  
  // Use centralized navigation and add subItems for this specific page
  const baseNavigation = getNavigationForSection('rh', '/pages/rh/gerir_cartao/dados_colaborador/cartao')
  const navigation = baseNavigation.map(item => {
    if (item.name === 'Gerir Cartão') {
      return {
        ...item,
        subItems: [
          { name: 'Dados do Colaborador', href: '/pages/rh/gerir_cartao/dados_colaborador', current: false },
          { name: 'Cartão', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao', current: true },
          { name: 'Ações', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao/acoes', current: false }
        ]
      }
    }
    return item
  })

  const tipoOptions = [
    { value: '', label: 'Selecione o tipo' },
    { value: 'profissional_ipo', label: 'Profissional IPO' },
    { value: 'prestador_servicos', label: 'Prestador de Serviços' }
  ]

  const estadoOptions = [
    { value: '', label: 'Selecione o estado' },
    { value: 'pendente', label: 'Pendente' },
    { value: 'ativo', label: 'Ativo' },
    { value: 'desativo', label: 'Desativo' }
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
      case 'ativo':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
      case 'desativo':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    }
  }

  const handleSave = () => {
    // Validação básica
    if (!numeroMec || !tipo || !estado || !dataEmissao || !validade) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Aqui seria feita a chamada à API para salvar os dados
    console.log({
      numeroMec,
      tipo,
      estado,
      dataEmissao,
      validade
    })
    
    alert('Dados do cartão salvos com sucesso!')
  }

  const handleReset = () => {
    setNumeroMec('')
    setTipo('')
    setEstado('')
    setDataEmissao('')
    setValidade('')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="CARTÃO DO COLABORADOR"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Formulário do Cartão */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <CreditCardIcon className="h-5 w-5 mr-2" />
                    Informações do Cartão
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    {/* Nº Mec */}
                    <div>
                      <label htmlFor="numeroMec" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nº Mec *
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="numeroMec"
                          name="numeroMec"
                          value={numeroMec}
                          onChange={(e) => setNumeroMec(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Digite o número MEC"
                        />
                      </div>
                    </div>

                    {/* Tipo */}
                    <div>
                      <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tipo *
                      </label>
                      <div className="mt-1">
                        <select
                          id="tipo"
                          name="tipo"
                          value={tipo}
                          onChange={(e) => setTipo(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          {tipoOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Estado */}
                    <div>
                      <label htmlFor="estado" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Estado *
                      </label>
                      <div className="mt-1 flex items-center space-x-3">
                        <select
                          id="estado"
                          name="estado"
                          value={estado}
                          onChange={(e) => setEstado(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          {estadoOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {estado && (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(estado)}`}>
                            {estadoOptions.find(opt => opt.value === estado)?.label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Data de Emissão */}
                    <div>
                      <label htmlFor="dataEmissao" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Data de Emissão *
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          id="dataEmissao"
                          name="dataEmissao"
                          value={dataEmissao}
                          onChange={(e) => setDataEmissao(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Validade */}
                    <div>
                      <label htmlFor="validade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Validade *
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          id="validade"
                          name="validade"
                          value={validade}
                          onChange={(e) => setValidade(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <XMarkIcon className="h-4 w-4 mr-2" />
                        Limpar
                      </button>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <CheckIcon className="h-4 w-4 mr-2" />
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <IdentificationIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Informações Importantes
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <ul className="list-disc list-inside space-y-1">
                        <li>O número MEC deve ser único para cada cartão</li>
                        <li>Cartões de "Profissional IPO" têm acesso completo às instalações</li>
                        <li>Cartões de "Prestador de Serviços" têm acesso limitado</li>
                        <li>A validade do cartão não pode ser anterior à data de emissão</li>
                      </ul>
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