'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  UserIcon,
  CreditCardIcon,
  PaperClipIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import Sidebar from '@/app/components/navigation/Sidebar'
import Navbar from '@/app/components/navigation/Navbar'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'

export default function AcaoDevolucaoPage() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [dataDevolucao, setDataDevolucao] = useState('')
  const [servico, setServico] = useState('')
  const [motivo, setMotivo] = useState('')
  const [cartaoBomEstado, setCartaoBomEstado] = useState(false)
  const [observacao, setObservacao] = useState('')
  const [anexos, setAnexos] = useState<File[]>([])

  // Exemplo de dados do colaborador e cartão
  const colaborador = {
    nome: 'João Silva',
    numMec: '123456',
    departamento: 'Informática',
    contacto: 'joao.silva@email.com',
  }
  const cartao = {
    numero: '987654321',
    tipo: 'Acesso Total',
    estado: 'Ativo',
    dataEmissao: '2024-01-15',
  }

  const motivos = [
    'Fim de contrato',
    'Acesso expirado',
    'Substituição',
    'Roubo / Perda',
  ]

  // Histórico de devoluções
  const historicoDevolucoes = [
    { data: '2023-06-01', motivo: 'Fim de contrato', estado: 'Devolvido' },
    { data: '2022-12-10', motivo: 'Substituição', estado: 'Devolvido' },
  ]

  // Checklist de devolução
  const checklist = [
    { label: 'Cartão desmagnetizado', done: true },
    { label: 'Etiqueta removida', done: false },
    { label: 'Assinatura do termo', done: true },
  ]

  // Alertas
  const alertas = [
    { tipo: 'warning', mensagem: 'Cartão anterior não devolvido.' },
    { tipo: 'info', mensagem: 'Colaborador com pendências administrativas.' },
  ]

  // Logs de auditoria
  const logs = [
    { acao: 'Pedido criado', user: 'Ana Silva', data: '2025-07-01 10:00' },
    { acao: 'Aprovado pelo RH', user: 'Carlos Sousa', data: '2025-07-01 11:00' },
    { acao: 'Cartão entregue', user: 'Ana Silva', data: '2025-07-02 09:00' },
  ]

  const navigation = [
    { name: 'Dashboard', href: '/pages/servico/dashboard', icon: ChartBarIcon, current: false },
    { name: 'Pedido_Cartão', href: '/pages/servico/pedido_cartao', icon: ChartBarIcon, current: false },
    {
      name: 'Devolução/Entrega',
      href: '/pages/servico/devolucao_entrega',
      icon: ChartBarIcon,
      current: false,
      subItems: [
        { name: 'Detalhes do Pedido', href: '/pages/servico/devolucao_entrega/detalhes_pedido', current: false },
        { name: 'Ação Devolução', href: '/pages/servico/devolucao_entrega/acao_devolucao', current: true },
        { name: 'Historico', href: '/pages/servico/devolucao_entrega/historico', current: false },
      ],
    },
  ]

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
    alert('Devolução registada!')
  }

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
          title="AÇÃO DE DEVOLUÇÃO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        <main className="flex-1 flex flex-col items-center justify-center py-10">
          <div className="w-full max-w-4xl flex flex-col gap-8">
            {/* Alertas */}
            {alertas.length > 0 && (
              <div className="flex flex-col gap-2">
                {alertas.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-4 py-2 rounded ${
                      alert.tipo === 'warning'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}
                  >
                    <ExclamationTriangleIcon className="h-5 w-5" />
                    <span>{alert.mensagem}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Resumo do Colaborador e Cartão */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">Colaborador</span>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200">Nome: {colaborador.nome}</div>
                <div className="text-sm text-gray-700 dark:text-gray-200">Num. Mec: {colaborador.numMec}</div>
                <div className="text-sm text-gray-700 dark:text-gray-200">Departamento: {colaborador.departamento}</div>
                <div className="text-sm text-gray-700 dark:text-gray-200">Contacto: {colaborador.contacto}</div>
              </section>
              <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCardIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">Cartão</span>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200">Nº: {cartao.numero}</div>
                <div className="text-sm text-gray-700 dark:text-gray-200">Tipo: {cartao.tipo}</div>
                <div className="text-sm text-gray-700 dark:text-gray-200">Estado: {cartao.estado}</div>
                <div className="text-sm text-gray-700 dark:text-gray-200">Emissão: {cartao.dataEmissao}</div>
              </section>
            </div>

            {/* Formulário principal */}
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Data de Devolução */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Data de Devolução
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={dataDevolucao}
                      onChange={e => setDataDevolucao(e.target.value)}
                      className="rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {/* Serviço */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Serviço
                  </label>
                  <input
                    type="text"
                    value={servico}
                    onChange={e => setServico(e.target.value)}
                    className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nome do serviço"
                    required
                  />
                </div>
              </div>
              {/* Motivo da Devolução */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Motivo da Devolução
                </label>
                <select
                  value={motivo}
                  onChange={e => setMotivo(e.target.value)}
                  className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Selecione o motivo</option>
                  {motivos.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              {/* Cartão bom estado */}
              <div className="flex items-center gap-2">
                <input
                  id="cartaoBomEstado"
                  type="checkbox"
                  checked={cartaoBomEstado}
                  onChange={e => setCartaoBomEstado(e.target.checked)}
                  className="accent-indigo-600 h-5 w-5"
                />
                <label htmlFor="cartaoBomEstado" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Cartão bom estado
                </label>
              </div>
              {/* Observações */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Observações
                </label>
                <textarea
                  value={observacao}
                  onChange={e => setObservacao(e.target.value)}
                  className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Adicionar observações..."
                  rows={2}
                />
              </div>
              {/* Anexos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2">
                  <PaperClipIcon className="h-5 w-5" />
                  Anexos
                </label>
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
              </div>
              {/* Checklist de devolução */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  Checklist de Devolução
                </label>
                <ul className="space-y-2">
                  {checklist.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <input type="checkbox" checked={item.done} readOnly className="accent-indigo-600" />
                      <span className={item.done ? "line-through text-gray-400" : ""}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
             
              {/* Botões de ação extra */}
              <div className="flex flex-wrap gap-4 justify-end">
                <button
                  type="button"
                  className="px-6 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  onClick={() => alert('Cancelado')}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  onClick={() => alert('Imprimir comprovativo')}
                >
                  Imprimir comprovativo
                </button>
                <button
                  type="button"
                  className="px-6 py-2 rounded bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition"
                  onClick={() => alert('Notificação enviada')}
                >
                  Notificar colaborador
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  OK
                </button>
              </div>
            </form>

            {/* Logs de auditoria */}
          
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