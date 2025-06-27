'use client'

import { useState } from 'react'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import NotificationsPanel from '@/app/components/notifications/NotificationsPanel'
import Navbar from '@/app/components/navigation/Navbar'
import Sidebar from '@/app/components/navigation/Sidebar'

export default function PedirCartao() {
  const [currentStep, setCurrentStep] = useState(1)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const tiposCartao = [
    { id: 'profissional', label: 'Profissional do IPO' },
    { id: 'prestador', label: 'Prestador de Serviços' },
  ]

  const motivosPedido = [
    { id: 'primeira_via', label: '1ª Via' },
    { id: 'segunda_via', label: '2ª Via' },
    { id: 'perda_dano', label: 'Perda/Dano' },
    { id: 'outro', label: 'Outro Motivo' },
  ]

  const niveisUrgencia = [
    { id: 'alta', label: 'Alta' },
    { id: 'media', label: 'Média' },
    { id: 'baixa', label: 'Baixa' },
  ]

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-6">
                1º PASSO - Dados do Colaborador
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nome Completo
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="num_mec" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Num_Mec
                  </Label>
                  <Input
                    id="num_mec"
                    name="num_mec"
                    value={formData.num_mec}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="departamento" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Departamento
                  </Label>
                  <Input
                    id="departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-6">
                2º PASSO - Dados do Cartão a Pedir
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tipo de Cartão
                  </Label>
                  <Select
                    value={formData.tipo}
                    onValueChange={(value) => handleSelectChange('tipo', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o tipo de cartão" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCartao.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Motivo do Pedido
                  </Label>
                  <Select
                    value={formData.motivo}
                    onValueChange={(value) => handleSelectChange('motivo', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {motivosPedido.map((motivo) => (
                        <SelectItem key={motivo.id} value={motivo.id}>
                          {motivo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Urgência do Pedido
                  </Label>
                  <Select
                    value={formData.urgencia}
                    onValueChange={(value) => handleSelectChange('urgencia', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione a urgência" />
                    </SelectTrigger>
                    <SelectContent>
                      {niveisUrgencia.map((nivel) => (
                        <SelectItem key={nivel.id} value={nivel.id}>
                          {nivel.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-6">
                3º PASSO - Data de Entrega & Validade do Cartão
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="data_entrega" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Data de Entrega
                  </Label>
                  <Input
                    id="data_entrega"
                    name="data_entrega"
                    type="date"
                    value={formData.data_entrega}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="data_validade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Data de Validade do Cartão
                  </Label>
                  <Input
                    id="data_validade"
                    name="data_validade"
                    type="date"
                    value={formData.data_validade}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const steps = [
    { id: 1, name: 'Dados do Colaborador' },
    { id: 2, name: 'Dados do Cartão' },
    { id: 3, name: 'Datas de Entrega e Validade' }
  ]

const renderProgressBar = () => (
  <div className="mb-8 flex justify-center">
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center">
            <div
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                currentStep > step.id
                  ? 'bg-green-100 text-green-800'
                  : currentStep === step.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
                  currentStep > step.id
                    ? 'bg-green-500 text-white'
                    : currentStep === step.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-400 text-white'
                }`}
              >
                {currentStep > step.id ? '✓' : step.id}
              </span>
              {step.name}
            </div>
            {index < steps.length - 1 && (
              <svg
                className="w-5 h-5 text-gray-400 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  </div>
)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar navigation={navigation} />

      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar
          title="PEDIR CARTÃO"
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          showBackButton={true}
        />

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {renderProgressBar()}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderStep()}

                <div className="flex justify-between">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePreviousStep}
                    >
                      Voltar
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="ml-auto"
                    >
                      Próximo
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto"
                    >
                      Submeter
                    </Button>
                  )}
                </div>
              </form>
            </div>
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
