'use client'

import { useState } from 'react'
import { ChartBarIcon, MagnifyingGlassIcon, PlusCircleIcon, ArrowPathIcon, EyeIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/app/components/navigation/Sidebar'
import Navbar from '@/app/components/navigation/Navbar'

export default function AcessosSolicitados() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [tipoFiltro, setTipoFiltro] = useState('')
  const [servicoFiltro, setServicoFiltro] = useState('')
  const [search, setSearch] = useState('')

  const navigation = [
    { name: 'Dashboard', href: '/pages/servico/dashboard', icon: ChartBarIcon, current: false },
    {
      name: 'Pedido_Cartão',
      href: '/pages/servico/pedido_cartao',
      icon: ChartBarIcon,
      current: false,
      subItems: [
        { name: 'Resumo Pedido', href: '/pages/servico/pedido_cartao/resumo_pedido', current: false },
        { name: 'Acessos Solicitados', href: '/pages/servico/pedido_cartao/acessos_solicitados', current: true },
                { name: 'Avaliação Responsável', href: '/pages/servico/pedido_cartao/avaliacao_responsavel', current: false },
                { name: 'Historico', href: '/pages/servico/pedido_cartao/historico', current: true }
      ]
    },
        { name: 'Devolução/Entrega', href: '/pages/servico/devolucao_entrega', icon: ChartBarIcon, current: true },
  ]

  // Mock data (agora com status, validade, responsável, prazo)
 const historico = [
    {
      id: 1,
      servico: 'Recursos Humanos',
      tipo: 'Permanente',
      status: 'Ativo',
      statusSolicitacao: 'Aprovado',
      data: '2025-06-01',
      validade: '',
      responsavel: 'Maria Gestora',
      prazo: '2h',
    },
    {
      id: 2,
      servico: 'TI',
      tipo: 'Temporário',
      status: 'Pendente',
      statusSolicitacao: 'Pendente',
      data: '2025-06-15',
      validade: '2025-07-15',
      responsavel: 'Carlos Silva',
      prazo: '6h',
    },
    {
      id: 3,
      servico: 'Financeiro',
      tipo: 'Permanente',
      status: 'Negado',
      statusSolicitacao: 'Rejeitado',
      data: '2025-05-20',
      validade: '',
      responsavel: 'Ana Costa',
      prazo: '—',
    },
    {
      id: 4,
      servico: 'TI',
      tipo: 'Temporário',
      status: 'Expirado',
      statusSolicitacao: 'Aprovado',
      data: '2025-04-01',
      validade: '2025-05-01',
      responsavel: 'Maria Gestora',
      prazo: '—',
    },
    // +10 exemplos extra
    {
      id: 5,
      servico: 'Logística',
      tipo: 'Temporário',
      status: 'Ativo',
      statusSolicitacao: 'Aprovado',
      data: '2025-06-20',
      validade: '2025-07-20',
      responsavel: 'Pedro Alves',
      prazo: '3h',
    },
    {
      id: 6,
      servico: 'Compras',
      tipo: 'Permanente',
      status: 'Pendente',
      statusSolicitacao: 'Pendente',
      data: '2025-06-22',
      validade: '',
      responsavel: 'Sofia Lima',
      prazo: '8h',
    },
    {
      id: 7,
      servico: 'Jurídico',
      tipo: 'Temporário',
      status: 'Negado',
      statusSolicitacao: 'Rejeitado',
      data: '2025-06-10',
      validade: '2025-07-01',
      responsavel: 'Rui Mendes',
      prazo: '—',
    },
    {
      id: 8,
      servico: 'Marketing',
      tipo: 'Permanente',
      status: 'Ativo',
      statusSolicitacao: 'Aprovado',
      data: '2025-05-30',
      validade: '',
      responsavel: 'Carla Sousa',
      prazo: '1h',
    },
    {
      id: 9,
      servico: 'Operações',
      tipo: 'Temporário',
      status: 'Expirado',
      statusSolicitacao: 'Aprovado',
      data: '2025-04-15',
      validade: '2025-05-15',
      responsavel: 'João Pinto',
      prazo: '—',
    },
    {
      id: 10,
      servico: 'RH',
      tipo: 'Permanente',
      status: 'Ativo',
      statusSolicitacao: 'Aprovado',
      data: '2025-06-05',
      validade: '',
      responsavel: 'Helena Dias',
      prazo: '2h',
    },
    {
      id: 11,
      servico: 'TI',
      tipo: 'Temporário',
      status: 'Pendente',
      statusSolicitacao: 'Pendente',
      data: '2025-06-25',
      validade: '2025-07-25',
      responsavel: 'Carlos Silva',
      prazo: '5h',
    },
    {
      id: 12,
      servico: 'Financeiro',
      tipo: 'Temporário',
      status: 'Negado',
      statusSolicitacao: 'Rejeitado',
      data: '2025-05-28',
      validade: '2025-06-28',
      responsavel: 'Ana Costa',
      prazo: '—',
    },
    {
      id: 13,
      servico: 'Compras',
      tipo: 'Permanente',
      status: 'Ativo',
      statusSolicitacao: 'Aprovado',
      data: '2025-06-12',
      validade: '',
      responsavel: 'Sofia Lima',
      prazo: '4h',
    },
    {
      id: 14,
      servico: 'Logística',
      tipo: 'Temporário',
      status: 'Expirado',
      statusSolicitacao: 'Aprovado',
      data: '2025-03-10',
      validade: '2025-04-10',
      responsavel: 'Pedro Alves',
      prazo: '—',
    },
  ]

  const tipos = ['Permanente', 'Temporário']
  const servicos = ['Recursos Humanos', 'TI', 'Financeiro']

  const filtered = historico.filter(item =>
    (tipoFiltro ? item.tipo === tipoFiltro : true) &&
    (servicoFiltro ? item.servico === servicoFiltro : true) &&
    (search ? item.servico.toLowerCase().includes(search.toLowerCase()) : true)
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />
      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="ACESSOS SOLICITADOS"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        <main className="flex-1">
          <div className="py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 w-full space-y-6">

                {/* Filtros e Pesquisa */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <select
                    value={tipoFiltro}
                    onChange={e => setTipoFiltro(e.target.value)}
                    className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-xs"
                  >
                    <option value="">Tipo de Acesso</option>
                    {tipos.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                  <select
                    value={servicoFiltro}
                    onChange={e => setServicoFiltro(e.target.value)}
                    className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-xs"
                  >
                    <option value="">Serviço</option>
                    {servicos.map(serv => (
                      <option key={serv} value={serv}>{serv}</option>
                    ))}
                  </select>
                  <div className="flex-1 flex items-center">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Pesquisar serviço..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-xs"
                    />
                  </div>
                  <button className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs font-semibold">
                    <PlusCircleIcon className="h-4 w-4" /> Solicitar Acesso
                  </button>
                </div>

                {/* Histórico */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Histórico de Solicitações</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-xs">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Serviço</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Tipo</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Data</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Status</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Status Solicitação</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Validade</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Responsável</th>
                          <th className="px-2 py-2 text-left font-semibold text-gray-600 dark:text-gray-300">Prazo de Resposta</th>
                          <th className="px-2 py-2 text-center font-semibold text-gray-600 dark:text-gray-300">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filtered.map(item => (
                          <tr key={item.id}>
                            <td className="px-2 py-2">{item.servico}</td>
                            <td className="px-2 py-2">{item.tipo}</td>
                            <td className="px-2 py-2">{item.data}</td>
                            <td className="px-2 py-2">
                              <span className={
                                item.status === 'Ativo'
                                  ? 'text-green-700 dark:text-green-300'
                                  : item.status === 'Pendente'
                                  ? 'text-yellow-700 dark:text-yellow-300'
                                  : item.status === 'Expirado'
                                  ? 'text-gray-500 dark:text-gray-400'
                                  : 'text-red-700 dark:text-red-300'
                              }>
                                {item.status}
                              </span>
                            </td>
                            <td className="px-2 py-2">
                              <span className={
                                item.statusSolicitacao === 'Aprovado'
                                  ? 'text-green-700 dark:text-green-300'
                                  : item.statusSolicitacao === 'Pendente'
                                  ? 'text-yellow-700 dark:text-yellow-300'
                                  : 'text-red-700 dark:text-red-300'
                              }>
                                {item.statusSolicitacao}
                              </span>
                            </td>
                            <td className="px-2 py-2">{item.validade || '-'}</td>
                            <td className="px-2 py-2">{item.responsavel}</td>
                            <td className="px-2 py-2">{item.prazo}</td>
                            <td className="px-2 py-2 text-center flex gap-2 justify-center">
                              <button className="flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-xs font-semibold">
                                <EyeIcon className="h-4 w-4" /> Ver Detalhes
                              </button>
                              <button className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs font-semibold">
                                <ArrowPathIcon className="h-4 w-4" /> Renovar
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filtered.length === 0 && (
                          <tr>
                            <td colSpan={9} className="text-center text-gray-500 dark:text-gray-300 py-8">
                              Nenhum resultado encontrado.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}