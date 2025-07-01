"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import NotificationsPanel from "../../../components/notifications/NotificationsPanel";
import Navbar from "../../../components/navigation/Navbar";
import Sidebar from "../../../components/navigation/Sidebar";
import { getNavigationForSection } from "../../../config/navigation";

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

  const tableData = [
    { id: 1, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 2, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 3, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 4, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 5, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 6, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 7, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 8, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
    { id: 9, nome: 'Joaquim', inec: '00000', motivo: 'Perda', data: '22/07/2000', estado: 'PENDENTE' },
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

  const navigation = getNavigationForSection('servico', '/pages/servico/devolucao_entrega');

  const filteredData = tableData; // sem filtro por tags

  function toggleRow(id: number) {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Cards de status maiores, transparentes e com efeito hover */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center p-5 rounded transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <span className="text-base text-gray-500 dark:text-gray-300 mb-1">Total para resolver</span>
                  <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">0</span>
                </div>
                <div className="flex flex-col items-center p-5 rounded transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <span className="text-base text-gray-500 dark:text-gray-300 mb-1">Pendentes</span>
                  <span className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">0</span>
                </div>
                <div className="flex flex-col items-center p-5 rounded transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <span className="text-base text-gray-500 dark:text-gray-300 mb-1">Concluido</span>
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">0</span>
                </div>
              </div>
              {/* Tabela com form maior e scroll interno */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow" style={{ height: 600 }}>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Devolução e Entrega do Cartão
                </h3>
                <div className="overflow-y-auto h-[480px]">
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