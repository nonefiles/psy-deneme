'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Client {
  id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  created_at: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const supabase = createClient()

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        const { data, error: fetchError } = await supabase
          .from('clients')
          .select('*')
          .eq('psychologist_id', user.id)
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError
        setClients(data || [])
      } catch (err) {
        setError('Danışanlar yüklenemedi')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [supabase])

  const filteredClients = clients.filter(
    (client) =>
      client.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Danışanlar</h1>
            <p className="text-slate-400">Danışanlarınızı yönetin ve izleyin</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Yeni Danışan
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Danışan adı, e-mail veya telefon ile ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Clients List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-400">Danışanlar yükleniyor...</p>
          </div>
        ) : error ? (
          <Card className="p-6 border-red-700/50 bg-red-900/10">
            <p className="text-red-400">{error}</p>
          </Card>
        ) : filteredClients.length === 0 ? (
          <Card className="p-12 text-center border-slate-700 bg-slate-800/50">
            <p className="text-slate-400 mb-4">Henüz danışan eklenmemiş</p>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" />
              İlk Danışanı Ekle
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <Card
                key={client.id}
                className="p-6 border-slate-700 bg-slate-800/50 hover:bg-slate-800/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {client.first_name} {client.last_name}
                    </h3>
                    <div className="flex gap-4 mt-2 text-sm text-slate-400">
                      {client.email && <p>📧 {client.email}</p>}
                      {client.phone && <p>📱 {client.phone}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">
                      Üye:{' '}
                      {new Date(client.created_at).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
