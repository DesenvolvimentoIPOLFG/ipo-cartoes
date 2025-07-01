'use client'

import { useState } from 'react'
import { UserIcon, CreditCardIcon, PaperClipIcon, CheckCircleIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/app/components/navigation/Sidebar'
import Navbar from '@/app/components/navigation/Navbar'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import { getNavigationForSection } from '@/app/config/navigation'

export default function DetalhesPedidoPage() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [observacao, setObservacao] = useState('')
  const [anexos, setAnexos] = useState<File[]>([])

  // Use centralized navigation
  const navigation = getNavigationForSection('servico', '/pages/servico/devolucao_entrega/detalhes_pedido')

  const notificacoes = [
    {
      id: 1,
      title: 'Cartão devolvido',
      description: 'Um cartão foi devolvido ao serviço.',
      time: 'há 5 minutos',
      status: 'info',
    },
  ]

  // Exemplo de histórico de ações
  const historico = [
    { data: '2025-07-01 10:00', acao: 'Pedido criado', user: 'Ana Silva' },
    { data: '2025-07-01 11:00', acao: 'Aprovado pelo RH', user: 'Carlos Sousa' },
    { data: '2025-07-02 09:00', acao: 'Cartão entregue', user: 'Ana Silva' },
  ]

  // Exemplo de checklist
  const checklist = [
    { label: 'Verificar identidade do colaborador', done: true },
    { label: 'Confirmar devolução do cartão anterior', done: false },
    { label: 'Registrar entrega no sistema', done: false },
  ]

  function handleAnexoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setAnexos([...anexos, ...Array.from(e.target.files)])
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />
      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="DETALHES DO PEDIDO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        <main className="flex-1 flex flex-col items-center justify-center py-10">
          <div className="w-full max-w-5xl flex flex-col gap-8">
            {/* Resumo do Pedido */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ClockIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-base font-semibold text-gray-900 dark:text-white">Pedido #12345</span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-300">Criado em 01/07/2025</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300">Status: <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-semibold">Pendente</span></div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition">Aprovar</button>
                <button className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition">Rejeitar</button>
              </div>
            </div>

            {/* Dados principais */}
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              {/* Dados do Colaborador */}
              <section className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow flex flex-col gap-6 min-w-[320px]">
                <div className="flex items-center gap-2 mb-4">
                  <UserIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Dados do Colaborador</span>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-200">Nome Completo</label>
                    <input type="text" className="flex-1 rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="Nome completo" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-200">Num_Mec</label>
                    <input type="text" className="flex-1 rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="Número mecânico" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-200">Departamento</label>
                    <input type="text" className="flex-1 rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="Departamento" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-200">Tipo de Contrato</label>
                    <input type="text" className="flex-1 rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="Tipo de contrato" />
                  </div>
                </div>
              </section>
              {/* Dados do Cartão */}
              <section className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow flex flex-col gap-6 min-w-[320px]">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCardIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Dados do Cartão</span>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-200">Nº Cartão</label>
                    <input type="text" className="flex-1 rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="Número do cartão" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-200">Tipo</label>
                    <input type="text" className="flex-1 rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="Tipo do cartão" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-200">Data de Emissão</label>
                    <input type="text" className="flex-1 rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="Data de emissão" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-200">Estado Atual</label>
                    <input type="text" className="flex-1 rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="Estado atual" />
                  </div>
                </div>
              </section>
            </div>

            {/* Observações e Anexos */}
            <div className="flex flex-col md:flex-row gap-8">
              <section className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow flex flex-col gap-4 min-w-[320px]">
                <div className="flex items-center gap-2 mb-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                  <span className="text-base font-semibold text-gray-900 dark:text-white">Observações</span>
                </div>
                <textarea
                  className="rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-[60px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Adicionar observações..."
                  value={observacao}
                  onChange={e => setObservacao(e.target.value)}
                />
              </section>
              <section className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow flex flex-col gap-4 min-w-[320px]">
                <div className="flex items-center gap-2 mb-2">
                  <PaperClipIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-base font-semibold text-gray-900 dark:text-white">Anexos</span>
                </div>
                <input
                  type="file"
                  multiple
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  onChange={handleAnexoChange}
                />
                <ul className="text-xs text-gray-700 dark:text-gray-200 mt-2">
                  {anexos.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Checklist e Histórico */}
            <div className="flex flex-col md:flex-row gap-8">
              <section className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow flex flex-col gap-4 min-w-[320px]">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="text-base font-semibold text-gray-900 dark:text-white">Checklist de Entrega</span>
                </div>
                <ul className="space-y-2">
                  {checklist.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <input type="checkbox" checked={item.done} readOnly className="accent-indigo-600" />
                      <span className={item.done ? "line-through text-gray-400" : ""}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow flex flex-col gap-4 min-w-[320px]">
                <div className="flex items-center gap-2 mb-2">
                  <ClockIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-base font-semibold text-gray-900 dark:text-white">Histórico de Ações</span>
                </div>
                <ul className="space-y-2 text-sm">
                  {historico.map((h, idx) => (
                    <li key={idx} className="flex flex-col">
                      <span className="font-semibold text-gray-800 dark:text-gray-100">{h.acao}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-300">{h.data} — {h.user}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </main>
      </div>
      <NotificationsPanel
        isOpen={notificationsOpen}
        setIsOpen={setNotificationsOpen}
        notifications={notificacoes}
      />
    </div>
  )
}