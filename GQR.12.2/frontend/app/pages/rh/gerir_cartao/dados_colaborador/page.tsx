'use client'

import React, { useState } from 'react'
import { 
  ChartBarIcon,
  UserIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

export default function DadosColaborador() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    numMec: '',
    departamento: '',
    email: '',
  })

  const notifications = [
    {
      id: 1,
      title: 'Dados Actualizados',
      description: 'As informações do colaborador foram actualizadas com sucesso',
      time: 'Há 5 minutos',
      status: 'success',
    },
    {
      id: 2,
      title: 'Verificação Pendente',
      description: 'Os dados do colaborador necessitam de verificação',
      time: 'Há 1 hora',
      status: 'warning',
    },
    {
      id: 3,
      title: 'Novo Colaborador',
      description: 'Novo colaborador adicionado ao sistema',
      time: 'Há 2 horas',
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
        { name: 'Dados do Colaborador', href: '/pages/rh/gerir_cartao/dados_colaborador', current: true },
        { name: 'Cartão', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao', current: false },
        { name: 'Acções', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao/acoes', current: false }
      ]
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Validação básica
    if (!formData.nome || !formData.numMec || !formData.departamento || !formData.email) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Aqui seria feita a chamada à API para guardar os dados
    console.log(formData)
    
    alert('Dados do colaborador guardados com sucesso!')
  }

  const handleReset = () => {
    setFormData({
      nome: '',
      numMec: '',
      departamento: '',
      email: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="DADOS DO COLABORADOR"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Formulário dos Dados do Colaborador */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <UserIcon className="h-5 w-5 mr-2" />
                    Informações do Colaborador
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    {/* Nome Completo */}
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
                          placeholder="Introduza o nome completo"
                        />
                      </div>
                    </div>

                    {/* Num_Mec */}
                    <div>
                      <label htmlFor="numMec" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nº Mecanográfico *
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="numMec"
                          name="numMec"
                          value={formData.numMec}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Introduza o número mecanográfico"
                        />
                      </div>
                    </div>

                    {/* Departamento */}
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
                          placeholder="Introduza o departamento"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Correio Electrónico *
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Introduza o correio electrónico"
                        />
                      </div>
                    </div>

                    {/* Botões de Acção */}
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
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <UserIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Informações Importantes
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Todos os campos são obrigatórios para o registo</li>
                        <li>O número mecanográfico deve ser único para cada colaborador</li>
                        <li>O correio electrónico será utilizado para comunicações oficiais</li>
                        <li>Verifique se todas as informações estão correctas antes de guardar</li>
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