'use client'

import { useState } from 'react'
import { ChartBarIcon, ClockIcon, UserCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/app/components/navigation/Sidebar'
import Navbar from '@/app/components/navigation/Navbar'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'

export default function HistoricoPedidos() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [selectedPedido, setSelectedPedido] = useState<number | null>(null)

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
    },
    {
      solicitante: 'Ana Martins',
      cargo: 'Recursos Humanos',
      departamento: 'RH',
      servico: 'Acesso ao Portal RH',
      data: '2025-07-10',
      justificacao: 'Gestão de férias e contratos.',
      urgencia: 'Média',
      nivelSolicitado: 'Total',
      condicoesEspeciais: 'Acesso apenas ao horário comercial.',
      impactoSeguranca: 'Acesso a dados pessoais dos colaboradores.',
      prazoDecisao: '24h',
      preview: 'Acesso ao cadastro de funcionários e relatórios de RH.'
    },
    {
      solicitante: 'Carlos Sousa',
      cargo: 'Financeiro',
      departamento: 'Financeiro',
      servico: 'Acesso ao ERP',
      data: '2025-07-12',
      justificacao: 'Fecho mensal de contas.',
      urgencia: 'Alta',
      nivelSolicitado: 'Total',
      condicoesEspeciais: 'Acesso liberado até o fim do mês.',
      impactoSeguranca: 'Acesso a dados financeiros sensíveis.',
      prazoDecisao: '6h',
      preview: 'Acesso ao módulo de lançamentos e relatórios financeiros.'
    },
    {
      solicitante: 'Beatriz Lopes',
      cargo: 'Marketing',
      departamento: 'Marketing',
      servico: 'Acesso ao Analytics',
      data: '2025-07-15',
      justificacao: 'Análise de campanhas digitais.',
      urgencia: 'Baixa',
      nivelSolicitado: 'Parcial',
      condicoesEspeciais: 'Acesso somente leitura.',
      impactoSeguranca: 'Sem acesso a dados sensíveis.',
      prazoDecisao: '48h',
      preview: 'Acesso aos dashboards de campanhas e métricas.'
    },
    {
      solicitante: 'Pedro Almeida',
      cargo: 'Engenheiro',
      departamento: 'Engenharia',
      servico: 'Acesso ao Servidor CAD',
      data: '2025-07-18',
      justificacao: 'Desenvolvimento de novos projetos.',
      urgencia: 'Média',
      nivelSolicitado: 'Específico',
      condicoesEspeciais: 'Acesso apenas ao diretório de projetos.',
      impactoSeguranca: 'Acesso restrito a arquivos de projetos.',
      prazoDecisao: '24h',
      preview: 'Acesso ao diretório CAD de projetos em andamento.'
    },
    {
      solicitante: 'Sofia Ribeiro',
      cargo: 'Jurídico',
      departamento: 'Jurídico',
      servico: 'Acesso ao Sistema de Contratos',
      data: '2025-07-20',
      justificacao: 'Revisão de contratos de fornecedores.',
      urgencia: 'Alta',
      nivelSolicitado: 'Total',
      condicoesEspeciais: 'Acesso temporário de 7 dias.',
      impactoSeguranca: 'Acesso a documentos jurídicos confidenciais.',
      prazoDecisao: '12h',
      preview: 'Acesso ao módulo de contratos e anexos.'
    }
  ]

  const navigation = [
    { name: 'Dashboard', href: '/pages/servico/dashboard', icon: ChartBarIcon, current: false },
    {
      name: 'Pedido_Cartão',
      href: '/pages/servico/pedido_cartao',
      icon: ChartBarIcon,
      current: false,
      subItems: [
        { name: 'Resumo Pedido', href: '/pages/servico/pedido_cartao/resumo_pedido', current: false },
        { name: 'Acessos Solicitados', href: '/pages/servico/pedido_cartao/acessos_solicitados', current: false },
        { name: 'Avaliação Responsável', href: '/pages/servico/pedido_cartao/avaliacao_responsavel', current: false },
        { name: 'Historico', href: '/pages/servico/pedido_cartao/historico', current: false }
      ]
    },
    { name: 'Devolução/Entrega', href: '/pages/servico/devolucao_entrega', icon: ChartBarIcon, current: true },
  ]

  const notificacoes = [
    {
      id: 1,
      title: 'Novo pedido para avaliação',
      description: 'Há um novo pedido aguardando sua decisão.',
      time: 'Agora mesmo',
      status: 'info',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />
      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="HISTÓRICO DE PEDIDOS"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        <main className="flex-1 flex flex-col items-center justify-center py-8">
          <div className="w-full max-w-4xl">
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-8 mt-20 flex flex-col gap-8 w-full ${selectedPedido === null ? 'h-[800px]' : 'h-auto'} overflow-y-auto`}>
              <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-6 ${selectedPedido !== null ? 'text-center w-full' : ''}`}>
                {selectedPedido === null ? 'Histórico de Pedidos' : 'Detalhes do Pedido'}
              </h2>
              {selectedPedido === null ? (
                <ol className="relative border-l border-gray-300 dark:border-gray-700">
                  {pedidos.map((pedido, idx) => (
                    <li
                      key={idx}
                      className="mb-10 ml-6 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded transition"
                      onDoubleClick={() => setSelectedPedido(idx)}
                      title="Duplo clique para ver detalhes"
                    >
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full -left-4 ring-8 ring-gray-100 dark:bg-indigo-900 dark:ring-gray-900">
                        <UserCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
                      </span>
                      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{pedido.solicitante}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-300">({pedido.cargo} — {pedido.departamento})</span>
                          <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold
                            ${pedido.urgencia === 'Alta' ? 'bg-red-100 text-red-700' : pedido.urgencia === 'Média' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            Urgência: {pedido.urgencia}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                          Serviço: <span className="font-semibold text-gray-900 dark:text-white">{pedido.servico}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <ClockIcon className="h-4 w-4 text-indigo-500" />
                          <span className="text-xs text-indigo-700 dark:text-indigo-300">{pedido.data}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-300">Justificação:</span>
                          <div className="text-xs text-gray-800 dark:text-gray-200">{pedido.justificacao}</div>
                        </div>
                        <div className="mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-300">Preview:</span>
                          <div className="text-xs text-gray-800 dark:text-gray-200">{pedido.preview}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="flex flex-col gap-4 items-center w-full">
                  <div className="w-full max-w-xl flex items-center mb-2">
                    <button
                      className="flex items-center justify-center p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() => setSelectedPedido(null)}
                      title="Voltar"
                    >
                      <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="w-full max-w-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow mt-0">
                    <div className="flex items-center gap-3 mb-2">
                      <UserCircleIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white text-lg">{pedidos[selectedPedido].solicitante}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-300">{pedidos[selectedPedido].cargo} — {pedidos[selectedPedido].departamento}</div>
                      </div>
                      <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold
                        ${pedidos[selectedPedido].urgencia === 'Alta' ? 'bg-red-100 text-red-700' : pedidos[selectedPedido].urgencia === 'Média' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        Urgência: {pedidos[selectedPedido].urgencia}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                      Serviço: <span className="font-semibold text-gray-900 dark:text-white">{pedidos[selectedPedido].servico}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <ClockIcon className="h-4 w-4 text-indigo-500" />
                      <span className="text-xs text-indigo-700 dark:text-indigo-300">{pedidos[selectedPedido].data}</span>
                    </div>
                    <div className="mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-300">Justificação:</span>
                      <div className="text-xs text-gray-800 dark:text-gray-200">{pedidos[selectedPedido].justificacao}</div>
                    </div>
                    <div className="mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-300">Preview:</span>
                      <div className="text-xs text-gray-800 dark:text-gray-200">{pedidos[selectedPedido].preview}</div>
                    </div>
                    <div className="mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-300">Nível solicitado:</span>
                      <span className="text-xs text-gray-800 dark:text-gray-200 ml-1">{pedidos[selectedPedido].nivelSolicitado}</span>
                    </div>
                    <div className="mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-300">Condições especiais:</span>
                      <span className="text-xs text-gray-800 dark:text-gray-200 ml-1">{pedidos[selectedPedido].condicoesEspeciais}</span>
                    </div>
                    <div className="mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-300">Impacto Segurança:</span>
                      <span className="text-xs text-gray-800 dark:text-gray-200 ml-1">{pedidos[selectedPedido].impactoSeguranca}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-300">Prazo decisão:</span>
                      <span className="text-xs text-gray-800 dark:text-gray-200 ml-1">{pedidos[selectedPedido].prazoDecisao}</span>
                    </div>
                  </div>
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