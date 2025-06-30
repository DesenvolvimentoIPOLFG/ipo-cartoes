'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
} from '@heroicons/react/24/outline'

import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

export default function DadosColaborador() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    numMec: '',
    departamento: '',
    email: '',
  })

  const notifications = [
    {
      id: 1,
      title: 'Dados Atualizados',
      description: 'Informações do colaborador foram atualizadas com sucesso',
      time: 'Há 5 minutos',
      status: 'success',
    },
    {
      id: 2,
      title: 'Verificação Pendente',
      description: 'Dados do colaborador necessitam de verificação',
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
        { name: 'Ações', href: '/pages/rh/gerir_cartao/dados_colaborador/cartao/acoes', current: false }
      ]
    },
  ]

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Dados do colaborador guardados!')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="DADOS DO COLABORADOR"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <main className="flex-1 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg px-8 py-10 w-full max-w-2xl border border-gray-200 dark:border-gray-700 flex flex-col items-center"
          >
            {/* Título com ícone */}
            <div className="flex flex-col items-center justify-center mb-8">
              <span className="mb-1 text-orange-500 text-2xl">🧑‍💼</span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                Dados do Colaborador
              </h2>
            </div>

            <div className="w-full grid grid-cols-1 gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <label className="font-bold uppercase text-base text-gray-700 dark:text-gray-200 tracking-wider text-right flex items-center justify-end">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="rounded border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-base"
                  required
                />

                <label className="font-bold uppercase text-base text-gray-700 dark:text-gray-200 tracking-wider text-right flex items-center justify-end">
                  Num_Mec
                </label>
                <input
                  type="text"
                  name="numMec"
                  value={form.numMec}
                  onChange={handleChange}
                  className="rounded border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-base"
                  required
                />

                <label className="font-bold uppercase text-base text-gray-700 dark:text-gray-200 tracking-wider text-right flex items-center justify-end">
                  Departamento
                </label>
                <input
                  type="text"
                  name="departamento"
                  value={form.departamento}
                  onChange={handleChange}
                  className="rounded border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-base"
                  required
                />

                <label className="font-bold uppercase text-base text-gray-700 dark:text-gray-200 tracking-wider text-right flex items-center justify-end">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="rounded border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-base"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 w-2/3 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition text-lg"
            >
              Guardar Dados
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