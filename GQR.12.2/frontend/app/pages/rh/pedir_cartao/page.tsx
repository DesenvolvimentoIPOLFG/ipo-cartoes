'use client'

import { useState } from 'react'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Label } from '@/app/components/ui/label'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

export default function PedirCartao() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [formData, setFormData] = useState({
    // Dados do Colaborador
    nome: '',
    num_mec: '',
    departamento: '',
    email: '',
    // Dados do Cartão
    tipo: '',
    motivo: '',
    urgencia: '',
    // Datas
    data_entrega: '',
    data_validade: ''
  })

  const navigation = [
    { name: 'Dashboard', href: '/pages/rh/dashboard', icon: ChartBarIcon, current: false },
    { name: 'Pedir Cartão', href: '/pages/rh/pedir_cartao', icon: ChartBarIcon, current: true },
    { name: 'Validar 2ª Via', href: '/pages/rh/validar2via', icon: ChartBarIcon, current: false },
    { name: 'Gerir Cartão', href: '/pages/rh/gerir cartao', icon: ChartBarIcon, current: false },
  ]

  const notifications = [
    {
      id: 1,
      title: 'Novo Pedido de Cartão',
      description: 'João Silva solicitou um novo cartão',
      time: 'Há 5 minutos',
      status: 'new',
    },
    {
      id: 2,
      title: 'Cartão Aprovado',
      description: 'O pedido de Maria Santos foi aprovado',
      time: 'Há 30 minutos',
      status: 'success',
    },
    {
      id: 3,
      title: 'Cartão Expirado',
      description: 'O cartão de Pedro Oliveira expira em 7 dias',
      time: 'Há 2 horas',
      status: 'warning',
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add API call here
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClearForm = () => {
    setFormData({
      nome: '',
      num_mec: '',
      departamento: '',
      email: '',
      tipo: '',
      motivo: '',
      urgencia: '',
      data_entrega: '',
      data_validade: ''
    })
  }

  const tiposCartao = [
    { id: 'padrao', label: 'Padrão' },
    { id: 'acesso_restrito', label: 'Acesso Restrito' },
    { id: 'visitante', label: 'Visitante' },
  ]

  const motivosPedido = [
    { id: 'novo', label: 'Novo Colaborador' },
    { id: 'perda', label: 'Perda/Roubo' },
    { id: 'danificado', label: 'Cartão Danificado' },
    { id: 'outro', label: 'Outro' },
  ]

  const niveisUrgencia = [
    { id: 'baixa', label: 'Baixa' },
    { id: 'media', label: 'Média' },
    { id: 'alta', label: 'Alta' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="PEDIR CARTÃO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          showBackButton={true}
        />

        <main className="flex-1 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-white dark:bg-gray-800 rounded-t-xl border-b dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dados do Colaborador</h2>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="nome" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nome Completo
                    </Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  {/* Repita o padrão para os outros campos */}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-white dark:bg-gray-800 rounded-t-xl border-b dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dados do Cartão</h2>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Cartão</Label>
                    <RadioGroup
                      value={formData.tipo}
                      onValueChange={(value: string) => setFormData(prev => ({ ...prev, tipo: value }))}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                      {tiposCartao.map((tipo) => (
                        <div
                          key={tipo.id}
                          className="relative flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem
                              value={tipo.id}
                              id={`tipo-${tipo.id}`}
                              className="h-5 w-5 text-blue-600 dark:text-blue-400"
                            />
                            <Label
                              htmlFor={`tipo-${tipo.id}`}
                              className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                            >
                              {tipo.label}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Repita o padrão para Motivo e Urgência */}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-white dark:bg-gray-800 rounded-t-xl border-b dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Datas</h2>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="data_entrega" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Data de Entrega
                    </Label>
                    <Input
                      id="data_entrega"
                      name="data_entrega"
                      type="date"
                      value={formData.data_entrega}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  {/* Repita para Data de Validade */}
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearForm}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Limpar Formulário
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Submeter
                </Button>
              </div>
            </form>
          </div>
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