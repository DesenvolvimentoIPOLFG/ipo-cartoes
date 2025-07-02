'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'
import { getNavigationForSection } from '@/app/config/navigation'

export default function HistoricoDevolucoes() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'data' | 'acao' | 'servico'>('data')
  const [sortAsc, setSortAsc] = useState(true)

  // Dados retirados da imagem fornecida (pode adicionar mais para testar scroll)
  const historico = [
    { data: '22/07/2000', acao: 'Produção', servico: 'RH', observacao: '' },
    { data: '23/07/2000', acao: 'Entrega', servico: 'RH', observacao: 'Cartão entregue' },
    { data: '24/07/2000', acao: 'Devolução', servico: 'RH', observacao: 'Cartão devolvido' },
    { data: '25/07/2000', acao: 'Produção', servico: 'RH', observacao: '' },
    { data: '26/07/2000', acao: 'Entrega', servico: 'RH', observacao: 'Cartão entregue' },
    { data: '27/07/2000', acao: 'Devolução', servico: 'RH', observacao: 'Cartão devolvido' },
    { data: '28/07/2000', acao: 'Produção', servico: 'RH', observacao: '' },
    { data: '29/07/2000', acao: 'Entrega', servico: 'RH', observacao: 'Cartão entregue' },
    { data: '30/07/2000', acao: 'Devolução', servico: 'RH', observacao: 'Cartão devolvido' },
    { data: '31/07/2000', acao: 'Produção', servico: 'RH', observacao: '' },
    { data: '01/08/2000', acao: 'Entrega', servico: 'RH', observacao: 'Cartão entregue' },
    { data: '02/08/2000', acao: 'Devolução', servico: 'RH', observacao: 'Cartão devolvido' },
    // ...adicione mais se quiser testar o scroll
  ]

  const navigation = getNavigationForSection('servico', '/pages/servico/devolucao_entrega/historico')

  const notificacoes = [
    {
      id: 1,
      title: 'Histórico atualizado',
      description: 'O histórico de devoluções foi atualizado.',
      time: 'Agora mesmo',
      status: 'info',
    },
  ]

  // Filtro de pesquisa
  const filtered = historico.filter(
    h =>
      h.data.includes(search) ||
      h.acao.toLowerCase().includes(search.toLowerCase()) ||
      h.servico.toLowerCase().includes(search.toLowerCase()) ||
      (h.observacao && h.observacao.toLowerCase().includes(search.toLowerCase()))
  )

  // Ordenação
  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sortBy]
    let valB = b[sortBy]
    if (sortBy === 'data') {
      // Ordenar por data (formato dd/mm/yyyy)
      const [da, ma, ya] = (valA as string).split('/').map(Number)
      const [db, mb, yb] = (valB as string).split('/').map(Number)
      const dateA = new Date(ya, ma - 1, da)
      const dateB = new Date(yb, mb - 1, db)
      return sortAsc ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }
    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortAsc
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    }
    return 0
  })

  // Exportação simples para CSV
  function exportCSV() {
    const header = 'Data;Ação;Serviço;Observação\n'
    const rows = sorted.map(h => `${h.data};${h.acao};${h.servico};${h.observacao || '-'}`).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'historico_devolucoes.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Estatísticas simples
  const total = historico.length
  const porAcao = historico.reduce((acc, h) => {
    acc[h.acao] = (acc[h.acao] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar navigation={navigation} />
      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="HISTÓRICO DE DEVOLUÇÕES"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        <main className="flex-1 flex flex-col items-center justify-center py-10">
          <div className="w-full max-w-3xl bg-white/90 dark:bg-gray-800/90 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 tracking-tight">
                Histórico de Devoluções
              </h2>
              {/* Estatísticas */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full font-semibold text-xs shadow">
                  Total: {total}
                </span>
                {Object.entries(porAcao).map(([acao, count]) => (
                  <span key={acao} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full font-semibold text-xs shadow">
                    {acao}: {count}
                  </span>
                ))}
              </div>
            </div>
            {/* Filtro de pesquisa e exportação */}
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center w-full md:w-auto flex-1">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value) }}
                  className="w-full md:w-72 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Pesquisar por data, ação, serviço ou observação..."
                />
              </div>
              <button
                type="button"
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 shadow transition"
                onClick={exportCSV}
                title="Exportar CSV"
              >
                <DocumentArrowDownIcon className="h-5 w-5" />
                Exportar
              </button>
            </div>
            {/* Tabela com scroll apenas no form */}
            <div className="overflow-x-auto rounded-xl shadow max-h-[600px] overflow-y-auto">
              <table className="min-w-full divide-y divide-indigo-100 dark:divide-gray-700 bg-white dark:bg-gray-800 rounded-xl">
                <thead className="sticky top-0 bg-white/95 dark:bg-gray-800/95 z-10">
                  <tr>
                    <th
                      className="px-4 py-3 text-xs font-bold text-indigo-700 dark:text-indigo-200 uppercase text-left cursor-pointer select-none transition hover:bg-indigo-50 dark:hover:bg-gray-900 rounded-tl-xl"
                      onClick={() => {
                        setSortBy('data')
                        setSortAsc(sortBy === 'data' ? !sortAsc : true)
                      }}
                    >
                      Data
                      {sortBy === 'data' && (sortAsc ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />)}
                    </th>
                    <th
                      className="px-4 py-3 text-xs font-bold text-indigo-700 dark:text-indigo-200 uppercase text-left cursor-pointer select-none transition hover:bg-indigo-50 dark:hover:bg-gray-900"
                      onClick={() => {
                        setSortBy('acao')
                        setSortAsc(sortBy === 'acao' ? !sortAsc : true)
                      }}
                    >
                      Ação
                      {sortBy === 'acao' && (sortAsc ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />)}
                    </th>
                    <th
                      className="px-4 py-3 text-xs font-bold text-indigo-700 dark:text-indigo-200 uppercase text-left cursor-pointer select-none transition hover:bg-indigo-50 dark:hover:bg-gray-900"
                      onClick={() => {
                        setSortBy('servico')
                        setSortAsc(sortBy === 'servico' ? !sortAsc : true)
                      }}
                    >
                      Serviço
                      {sortBy === 'servico' && (sortAsc ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />)}
                    </th>
                    <th className="px-4 py-3 text-xs font-bold text-indigo-700 dark:text-indigo-200 uppercase text-left rounded-tr-xl">
                      Observação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-indigo-50 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">{item.data}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{item.acao}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{item.servico}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {item.observacao
                          ? <span title={item.observacao}>{item.observacao}</span>
                          : <span className="text-gray-400">-</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {sorted.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-300 py-8">
                  Nenhum histórico encontrado.
                </div>
              )}
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