'use client'

import { useState } from 'react'
import { CalendarIcon, ChartBarIcon, PencilSquareIcon, XCircleIcon, CheckCircleIcon, PrinterIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/app/components/navigation/Sidebar'
import Navbar from '@/app/components/navigation/Navbar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function ResumoPedido() {
  // Mock data
  const pedidoInfo = {
    numero: '#PED-2025-0031',
    data: '2025-06-30',
    estado: 'Pendente',
    responsavel: 'João Silva',
  }

  const utilizadores = [
    {
      nome: 'Ana Costa',
      numInterno: 'F1234',
      tipoCartao: 'Acesso Geral',
      departamento: 'Recursos Humanos',
      validadeInicio: '2025-07-01',
      validadeFim: '2026-07-01',
      foto: '/user-photo.jpg', // opcional
      funcao: 'Assistente RH',
    },
    {
      nome: 'Carlos Silva',
      numInterno: 'F5678',
      tipoCartao: 'Acesso Técnico',
      departamento: 'TI',
      validadeInicio: '2025-07-01',
      validadeFim: '2026-07-01',
      foto: '/user-photo2.jpg',
      funcao: 'Técnico de Sistemas',
    },
  ]

  const historico = [
    { acao: 'Pedido submetido', user: 'João Silva', data: '2025-06-30 10:12' },
    { acao: 'Foto atualizada', user: 'Ana Costa', data: '2025-06-30 10:15' },
    { acao: 'Pedido aprovado por', user: 'Maria Gestora', data: '2025-07-01 09:00' },
  ]

  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Use centralized navigation
  const navigation = getNavigationForSection('servico', '/pages/servico/pedido_cartao/resumo_pedido')

  // Estado para ações (exemplo)
  const [canEdit, setCanEdit] = useState(true)
  const [canApprove, setCanApprove] = useState(true)
  const [canReject, setCanReject] = useState(true)
  const [canCancel, setCanCancel] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />
      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="RESUMO DO PEDIDO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        <main className="flex-1">
          <div className="py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 w-full space-y-8">

                {/* Informação do Pedido */}
                <section>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span>Informação do Pedido</span>
                      </h2>
                      <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                        Número do Pedido: <span className="font-mono">{pedidoInfo.numero}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {canEdit && (
                        <button className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-xs font-semibold">
                          <PencilSquareIcon className="h-4 w-4" /> Editar
                        </button>
                      )}
                      {canCancel && (
                        <button className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold">
                          <XCircleIcon className="h-4 w-4" /> Cancelar
                        </button>
                      )}
                      {canApprove && (
                        <button className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs font-semibold">
                          <CheckCircleIcon className="h-4 w-4" /> Aprovar
                        </button>
                      )}
                      {canReject && (
                        <button className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-xs font-semibold">
                          <XCircleIcon className="h-4 w-4" /> Rejeitar
                        </button>
                      )}
                      <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-xs font-semibold">
                        <PrinterIcon className="h-4 w-4" /> Imprimir
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-xs font-semibold">
                        <EnvelopeIcon className="h-4 w-4" /> Enviar por email
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">Data do Pedido</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{pedidoInfo.data}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">Estado Atual</div>
                      <div className="font-semibold text-yellow-700 dark:text-yellow-300">{pedidoInfo.estado}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">Responsável</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{pedidoInfo.responsavel}</div>
                    </div>
                  </div>
                </section>

                {/* Informação dos Utilizadores Associados */}
                <section>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Utilizadores Associados</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-xs">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Nome</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Nº Interno</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Tipo Cartão</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Departamento</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Função</th>
                          <th className="px-2 py-2 text-center font-semibold text-gray-600 dark:text-gray-300">Validade</th>
                          <th className="px-2 py-2 text-center font-semibold text-gray-600 dark:text-gray-300">Pré-visualização</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {utilizadores.map((u, idx) => (
                          <tr key={idx}>
                            <td className="px-2 py-2">{u.nome}</td>
                            <td className="px-2 py-2">{u.numInterno}</td>
                            <td className="px-2 py-2">{u.tipoCartao}</td>
                            <td className="px-2 py-2">{u.departamento}</td>
                            <td className="px-2 py-2">{u.funcao}</td>
                            <td className="px-2 py-2 text-center">
                              {u.validadeInicio} <span className="text-gray-400">→</span> {u.validadeFim}
                            </td>
                            <td className="px-2 py-2 text-center">
                              {/* Pré-visualização do cartão (simples) */}
                              <div className="inline-block bg-indigo-100 dark:bg-indigo-900 rounded shadow px-2 py-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <img src={u.foto} alt={u.nome} className="object-cover w-full h-full" />
                                  </div>
                                  <div>
                                    <div className="font-bold text-xs text-indigo-900 dark:text-indigo-200">{u.nome}</div>
                                    <div className="text-[10px] text-gray-600 dark:text-gray-300">{u.funcao}</div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Observações ou Justificação */}
                <section>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Observações / Justificação</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3 text-sm text-gray-800 dark:text-gray-200 min-h-[48px]">
                    Pedido de 2ª via devido a extravio do cartão original. Utilizadores necessitam de acesso urgente.
                  </div>
                </section>

                {/* Histórico do Pedido */}
                <section>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Histórico do Pedido</h3>
                  <ul className="space-y-2 text-xs">
                    {historico.map((h, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="inline-block w-32 text-gray-500 dark:text-gray-400">{h.data}</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">{h.acao}</span>
                        <span className="text-gray-600 dark:text-gray-300">{h.user}</span>
                      </li>
                    ))}
                  </ul>
                </section>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}