'use client'

import { useState } from 'react'
import { PaperClipIcon, ExclamationTriangleIcon, ClockIcon, UserCircleIcon, CheckCircleIcon, XCircleIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/app/components/navigation/Sidebar'
import Navbar from '@/app/components/navigation/Navbar'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import { getNavigationForSection } from '@/app/config/navigation'

export default function AvaliacaoResponsavel() {
  const [showRecusar, setShowRecusar] = useState(false)
  const [motivo, setMotivo] = useState('')
  const [motivoTemplate, setMotivoTemplate] = useState('')
  const [showCondicoes, setShowCondicoes] = useState(false)
  const [condicoes, setCondicoes] = useState('')
  const [expiracao, setExpiracao] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [nivelAcesso, setNivelAcesso] = useState('Total')
  const [file, setFile] = useState<File | null>(null)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [pedidoIndex, setPedidoIndex] = useState(0)

  // Array de pedidos
  const pedidos = [
    {
      solicitante: 'João Silva',
      cargo: 'Analista de Sistemas',
      departamento: 'TI',
      servico: 'Acesso ao Sistema X',
      data: '2025-06-30',
      justificacao: 'Necessidade de acesso para manutenção urgente.',
      urgencia: 'Alta',
      nivelSolicitado: 'Total',
      condicoesEspeciais: 'Acesso apenas em horário laboral.',
      impactoSeguranca: 'Acesso total ao sistema crítico.',
      prazoDecisao: '12h',
      preview: 'Acesso ao módulo financeiro, relatórios e exportação de dados.'
    },
    {
      solicitante: 'Ricardo Bernardo',
      cargo: 'Gestor de Projetos',
      departamento: 'Operações',
      servico: 'Acesso ao Sistema de Gestão',
      data: '2025-07-01',
      justificacao: 'Necessidade de acesso para acompanhamento de projetos em andamento.',
      urgencia: 'Média',
      nivelSolicitado: 'Parcial',
      condicoesEspeciais: 'Acesso restrito ao módulo de relatórios.',
      impactoSeguranca: 'Acesso parcial a dados sensíveis de projetos.',
      prazoDecisao: '24h',
      preview: 'Acesso ao painel de relatórios e dashboards de projetos.'
    },
       {
      solicitante: 'Miguel Fernandes',
      cargo: 'Estudante',
      departamento: 'Limpeza',
      servico: 'Acesso a casa de banho',
      data: '2025-09-23',
      justificacao: 'Necessidade de acesso para ir a casa de banho.',
      urgencia: 'Baixa',
      nivelSolicitado: 'Específico',
      condicoesEspeciais: 'Acesso restrito a casa de banho.',
      impactoSeguranca: 'Acesso especifico a casa de banho.',
      prazoDecisao: '48h',
      preview: 'Acesso ao a casa de banho.'
    }
  ]

  const pedido = pedidos[pedidoIndex]

  // Use centralized navigation
  const navigation = getNavigationForSection('servico', '/pages/servico/pedido_cartao/avaliacao_responsavel')

  const notificacoes = [
    {
      id: 1,
      title: 'Novo pedido para avaliação',
      description: 'Há um novo pedido aguardando sua decisão.',
      time: 'Agora mesmo',
      status: 'info',
    },
  ]

  const motivosTemplates = [
    '',
    'Falta de documentação',
    'Acesso não justificado',
    'Solicitação duplicada',
    'Política de segurança'
  ]

  function handleAceitar() {
    alert('Pedido aceito!')
  }

  function handleAceitarCondicoes() {
    alert('Pedido aceito com condições: ' + condicoes + (expiracao ? ` | Expira em: ${expiracao}` : ''))
    setShowCondicoes(false)
    setCondicoes('')
    setExpiracao('')
  }

  function handleRecusar() {
    const motivoFinal = motivoTemplate ? motivoTemplate : motivo
    if (!motivoFinal.trim()) {
      alert('Por favor, indique o motivo da recusa.')
      return
    }
    alert('Pedido recusado com motivo: ' + motivoFinal)
    setShowRecusar(false)
    setMotivo('')
    setMotivoTemplate('')
    setFile(null)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0])
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />
      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="AVALIAÇÃO DO RESPONSÁVEL"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        <main className="flex-1 flex flex-col items-center justify-center py-8">
          <div className="w-full max-w-2xl">
            {/* ComboBox para selecionar o pedido */}
            <div className="mb-6 flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Selecionar pedido:</label>
              <select
                className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2"
                value={pedidoIndex}
                onChange={e => setPedidoIndex(Number(e.target.value))}
              >
                {pedidos.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {p.solicitante} — {p.servico}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mt-20 flex flex-col gap-8 w-full">
              {/* ↑ mt-20 = margin-top grande (5dp) */}
              {/* Resumo do Pedido */}
              <section className="space-y-2">
                <div className="flex items-center gap-3">
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{pedido.solicitante}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{pedido.cargo} — {pedido.departamento}</div>
                  </div>
                  <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold
                    ${pedido.urgencia === 'Alta' ? 'bg-red-100 text-red-700' : pedido.urgencia === 'Média' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    Urgência: {pedido.urgencia}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  Serviço solicitado: <span className="font-semibold text-gray-900 dark:text-white">{pedido.servico}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  Data da solicitação: <span className="font-semibold text-gray-900 dark:text-white">{pedido.data}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  Justificação original: <span className="font-semibold text-gray-900 dark:text-white">{pedido.justificacao}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  Nível solicitado: <span className="font-semibold text-gray-900 dark:text-white">{pedido.nivelSolicitado}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  Condições especiais: <span className="font-semibold text-gray-900 dark:text-white">{pedido.condicoesEspeciais}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                  <span className="text-xs text-yellow-700 dark:text-yellow-300">{pedido.impactoSeguranca}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <ClockIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-xs text-indigo-700 dark:text-indigo-300">Prazo para decisão: {pedido.prazoDecisao}</span>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-500 dark:text-gray-300">Preview do acesso:</div>
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-2 text-xs text-gray-800 dark:text-gray-200">
                    {pedido.preview}
                  </div>
                </div>
              </section>

              {/* Área de Decisão */}
              <section className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-4 text-lg font-semibold rounded-lg bg-green-500 hover:bg-green-600 text-white shadow transition"
                    onClick={handleAceitar}
                  >
                    <CheckCircleIcon className="h-6 w-6" /> Aceitar
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-4 text-lg font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow transition"
                    onClick={() => setShowCondicoes(true)}
                  >
                    <AdjustmentsHorizontalIcon className="h-6 w-6" /> Aceitar com Condições
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-4 text-lg font-semibold rounded-lg bg-red-500 hover:bg-red-600 text-white shadow transition"
                    onClick={() => setShowRecusar(true)}
                  >
                    <XCircleIcon className="h-6 w-6" /> Recusar
                  </button>
                </div>

                {/* Aceitar com Condições */}
                {showCondicoes && (
                  <div className="w-full mt-4 flex flex-col gap-2 bg-blue-50 dark:bg-blue-900 rounded p-4">
                    <input
                      className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2"
                      placeholder="Condições/restrições (ex: horário, módulos, etc.)"
                      value={condicoes}
                      onChange={e => setCondicoes(e.target.value)}
                    />
                    <input
                      className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2"
                      type="date"
                      value={expiracao}
                      onChange={e => setExpiracao(e.target.value)}
                      placeholder="Data de expiração (opcional)"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        className="flex-1 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        onClick={handleAceitarCondicoes}
                      >
                        Confirmar
                      </button>
                      <button
                        className="flex-1 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold"
                        onClick={() => { setShowCondicoes(false); setCondicoes(''); setExpiracao('') }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {/* Recusar */}
                {showRecusar && (
                  <div className="w-full mt-4 flex flex-col gap-2 bg-red-50 dark:bg-red-900 rounded p-4">
                    <select
                      className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2"
                      value={motivoTemplate}
                      onChange={e => setMotivoTemplate(e.target.value)}
                    >
                      {motivosTemplates.map((m, i) => (
                        <option key={i} value={m}>{m ? m : 'Escolha um motivo comum (opcional)'}</option>
                      ))}
                    </select>
                    <textarea
                      className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2"
                      rows={3}
                      placeholder="Indique o motivo da recusa..."
                      value={motivo}
                      onChange={e => setMotivo(e.target.value)}
                    />
                    <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-200">
                      <PaperClipIcon className="h-4 w-4" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      {file ? file.name : 'Anexar documento (opcional)'}
                    </label>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="flex-1 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
                        onClick={handleRecusar}
                      >
                        Enviar recusa
                      </button>
                      <button
                        className="flex-1 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold"
                        onClick={() => { setShowRecusar(false); setMotivo(''); setMotivoTemplate(''); setFile(null) }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {/* Campos adicionais */}
                <div className="mt-4 space-y-2">
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-300">Observações internas</label>
                    <textarea
                      className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2"
                      rows={2}
                      placeholder="Notas para outros responsáveis (opcional)"
                      value={observacoes}
                      onChange={e => setObservacoes(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-300">Nível de acesso</label>
                    <select
                      className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2"
                      value={nivelAcesso}
                      onChange={e => setNivelAcesso(e.target.value)}
                    >
                      <option value="Total">Total</option>
                      <option value="Parcial">Parcial</option>
                      <option value="Específico">Específico</option>
                    </select>
                  </div>
                </div>
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