import Navigation from './components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">Navegação GQR.12.2</h1>
      <div className="max-w-4xl mx-auto">
        <Navigation />
      </div>
    </div>
  )
}