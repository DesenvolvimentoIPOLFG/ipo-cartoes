"use client";

import { useState } from "react";
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  TagIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  XCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import NotificationsPanel from "../../../components/notifications/NotificationsPanel";
import Navbar from "../../../components/navigation/Navbar";
import Sidebar from "../../../components/navigation/Sidebar";

function StatusEntrega({ status }: { status: string }) {
  if (status === 'PENDENTE') {
    return <span className="text-yellow-600 font-bold">Pendente</span>
  }
  if (status === 'DEVOLVIDO') {
    return <span className="text-green-600 font-bold">Devolvido</span>
  }
  return <span className="text-gray-600 font-semibold">{status}</span>
}

export default function DevolucaoEntregaPage() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showChecklist, setShowChecklist] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [tagsFilter, setTagsFilter] = useState('');

  const tableData = [
    { id: 1, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 2, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 3, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 4, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
  ];

  const notificacoes = [
    {
      id: 1,
      title: 'Cartão devolvido',
      description: 'Um cartão foi devolvido ao serviço.',
      time: 'há 5 minutos',
      status: 'info',
    },
    {
      id: 2,
      title: 'Entrega pendente',
      description: 'Há cartões aguardando entrega.',
      time: 'Hoje',
      status: 'alerta',
    },
  ];

  const navigation = [
    { name: 'Dashboard', href: '/pages/servico/dashboard', icon: ChartBarIcon, current: false },
    {
      name: 'Devolução/Entrega',
      href: '/pages/servico/devolucao_entrega',
      icon: ChartBarIcon,
      current: true,
    },
  ];

  const filteredData = tableData; // sem filtro por tags

  function toggleRow(id: number) {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  function handleManualRefresh() {
    setLastUpdate(new Date())
  }

  const checklistSteps = [
    'Verificar integridade do cartão',
    'Confirmar dados do colaborador',
    'Registrar devolução/entrega no sistema',
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />
      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="DEVOLUÇÃO/ENTREGA"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Quick Links e Filtros */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex flex-row gap-2">
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-300">
                      Atualizado há {Math.round((Date.now() - lastUpdate.getTime()) / 60000)} min
                    </span>
                  </div>
                </div>
              </div>
              {/* Tabela */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Devolução e Entrega do Cartão
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">INEC</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Motivo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1">Data <MagnifyingGlassIcon className="h-4 w-4 inline text-gray-400" /></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredData.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{row.nome}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.inec}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.motivo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{row.data}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <StatusEntrega status={row.estado} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button className="inline-flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 transition" title="Ver detalhes" type="button">
                              <MagnifyingGlassIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredData.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-300 py-8">
                      Nenhum resultado encontrado.
                    </div>
                  )}
                </div>
              </div>
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
  );
}
